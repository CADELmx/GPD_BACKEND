import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

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
