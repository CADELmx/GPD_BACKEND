import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dt';
import { Prisma } from '@prisma/client';
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any){
    const payload = { username: user.email, sub: user.id.toString()};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  /*async register (userDto: CreateUserDto): Promise<Users>{
    const existingUser = await this.usersService.getUserByEmail(userDto.email);
    if(existingUser){
      throw new ConflictException('El usuario ya existe');
    }
    return await this.usersService.createUser(userDto);
  }*/
}
