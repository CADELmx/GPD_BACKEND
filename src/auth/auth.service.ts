import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/models/user/create-user.dto';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prismaErrorHandler: PrismaErrorHandler
  ) { }

  async signIn(username: string, pass: string) {
    try {
      const user = await this.usersService.getUserByEmail(username);
      const encryptedPassword = await this.usersService.encryptPassword(pass);
      if (user?.password !== encryptedPassword) {
        throw new UnauthorizedException({
          data: null,
          error: 'Credenciales inválidas',
          message: 'Las credenciales que se proporcionaron no coinciden con los registros',
        });
      }
      const payload = { username: user.email, sub: user.id.toString() };
      const access_token = await this.jwtService.signAsync(payload)
      return {
        error: null,
        data: {
          access_token
        },
        message: 'Usuario autenticado correctamente',
      };
    } catch (error) {
      console.log(error)
      return this.prismaErrorHandler.handleError(
        error,
        'Error al autenticar al usuario'
      );
    }
  }
  async signUp(user: CreateUserDto) {
    try {
      const { data: newUser } = await this.usersService.createUser(user);
      const payload = { username: newUser.email, sub: newUser.id.toString() };
      const access_token = await this.jwtService.signAsync(payload)
      console.log(payload, access_token)
      return {
        error: null,
        data: {
          access_token
        },
        message: 'Usuario autenticado con éxito, ya puedes empezar a usar el servicio'
      };
    } catch (error) {
      console.log(error)
      return this.prismaErrorHandler.handleError(
        error,
        'Error al realizar el registro de la cuenta'
      )
    }
  }
}
