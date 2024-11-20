import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from 'src/models/user/create-user.dto';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { jwtConstants } from 'src/auth/constants';
import { promisify } from 'util';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private prismaErrorHandler: PrismaErrorHandler
  ) { }
  async getUserByEmail(email: string): Promise<Users | null> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotAcceptableException('usuario no existente');
    }
    return user;
  }

  async findUserById(userId: bigint): Promise<Users> {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }
  async encryptPassword(password: string) {
    const secret = process.env.JWT_SECRET;
    const iv = Buffer.from(secret.slice(0, 16), 'binary')
    const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    const encryptedPassword = Buffer.concat([
      cipher.update(password),
      cipher.final(),
    ]);
    return encryptedPassword.toString('hex')
  }
  async decryptPassword(
    encryptedPassword: string,
  ): Promise<string> {
    const secret = process.env.JWT_SECRET;
    const iv = Buffer.from(secret.slice(0, 16), 'binary')
    const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    const decryptedPassword = Buffer.concat([
      decipher.update(Buffer.from(encryptedPassword, 'hex')),
      decipher.final(),
    ]);
    return decryptedPassword.toString();
  }
  async createUser(user: CreateUserDto) {
    try {
      const encryptedPassword = await this.encryptPassword(user.password);
      const createdUser = await this.prisma.users.create({
        data: {
          ...user,
          password: encryptedPassword,
        },
      });
      return {
        data: createdUser,
        error: null,
        message: 'Usuario creado con éxito',
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al crear el usuario'
      );
    }
  }
}
