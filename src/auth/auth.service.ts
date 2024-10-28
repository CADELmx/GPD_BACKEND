import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.getUserByEmail(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { username: user.email, sub: user.id.toString() };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
