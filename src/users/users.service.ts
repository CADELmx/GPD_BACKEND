import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from 'src/models/user/create-user.dto';
import { compare, hashSync } from 'bcrypt';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { jwtConstants } from 'src/auth/constants';
import { promisify } from 'util';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

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
  async encryptPassword(password: string): Promise<string> {
    const iv = randomBytes(16);
    const secret = jwtConstants.secret
    const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    const encryptedPassword = Buffer.concat([
      cipher.update(password),
      cipher.final(),
    ]);
    return encryptedPassword.toString('hex');
  }
  async decryptPassword(
    encryptedPassword: string,
  ): Promise<string> {
    const iv = randomBytes(16);
    const secret = jwtConstants.secret
    const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    const decryptedPassword = Buffer.concat([
      decipher.update(Buffer.from(encryptedPassword, 'hex')),
      decipher.final(),
    ]);
    return decryptedPassword.toString();
  }
  async createUser(user: CreateUserDto): Promise<Users> {
    const encriptedPassword = await this.encryptPassword(user.password);
    return this.prisma.users.create({
      data: {
        ...user,
        password: encriptedPassword,
      },
    });
  }
}
