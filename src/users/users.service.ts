import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dt';


@Injectable()
export class UsersService {

  constructor (private prisma: PrismaService){}

  async getUserByEmail(email: string): Promise<Users | null>{
    const user = await this.prisma.users.findUnique({
      where: {
        email: email,
        active: true,
      },
    });

  if (!user) {
    throw new NotAcceptableException('usuario no existente');
  }
    return user;
  }

  /*async createUser(data: Prisma.UsersCreateInput): Promise<Users>{
    const existingUser = await this.getUserByEmail(data.email);
    if(existingUser){
      throw new ConflictException('Usuario existente');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.prisma.users.create({
      data: { ...data, password: hashedPassword},
    })
  }*/

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

}