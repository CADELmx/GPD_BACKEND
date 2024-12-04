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
import { UpdateUserDto } from 'src/models/user/update-user.dto';

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
      }
    });

    if (!user) {
      throw new NotAcceptableException('usuario no existente');
    }
    return user;
  }
  async findUserJoinPersonalData(email: string): Promise<{
    data: Users | null,
    error: any,
    message: string
  }> {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email: email,
        },
        include: {
          personalData: {
            select: {
              ide: true,
              name: true,
              position: true,
              area: true,
            }
          }
        }
      });
      if (!user) return {
        data: null,
        error: null,
        message: 'Usuario no encontrado'
      }
      return {
        data: user,
        error: null,
        message: 'Usuario encontrado con éxito'
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al obtener el usuario'
      )
    }
  }

  async updateUser(userId: bigint, data: UpdateUserDto) {
    try {
      const selectedUser = await this.prisma.users.findUnique({
        where: {
          id: userId,
        },
      });
      if (!selectedUser) {
        throw new NotFoundException('Usuario no encontrado');
      }
      const user = await this.prisma.users.update({
        where: {
          id: userId,
        },
        data,
      });
      return {
        data: user,
        error: null,
        message: 'Usuario actualizado con éxito'
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al actualizar el usuario'
      )
    }
  }
  async updatePassword(userId: bigint, data: string) {
    try {
      const selectedUser = await this.prisma.users.findUnique({
        where: {
          id: userId,
        },
      });
      if (!selectedUser) {
        throw new NotFoundException('Usuario no encontrado');
      }
      const encryptedPassword = await this.encryptPassword(data);
      if (selectedUser.password === encryptedPassword) {
        throw new NotAcceptableException('La contraseña nueva no puede ser igual a la anterior');
      }
      const user = await this.prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          password: encryptedPassword,
        },
      });
      return {
        data: user,
        error: null,
        message: 'Contraseña actualizada con éxito'
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al actualizar la contraseña'
      )
    }
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
  async remove(userId: bigint) {
    try {
      const deletedUser = await this.prisma.users.delete({
        where: {
          id: userId,
        },
      });
      return {
        data: deletedUser,
        error: null,
        message: 'Usuario eliminado con éxito'
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al eliminar el usuario'
      );
    }
  }
  async decrypt(string: string) {
    try {
      return await this.decryptPassword(string);
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al desecriptar la contraseña'
      );
    }
  }
}
