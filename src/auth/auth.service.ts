import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/models/user/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.getUserByEmail(username);
    const encryptedPassword = await this.usersService.encryptPassword(pass);
    if (user?.password !== encryptedPassword) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = { username: user.email, sub: user.id.toString() };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(user: CreateUserDto) {
    const newUser = await this.usersService.createUser(user);
    const payload = { username: newUser.email, sub: newUser.id.toString() };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
