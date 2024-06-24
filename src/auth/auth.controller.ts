import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dt';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './strategies/guards/local-auth.guard';
import { JwtAuthGuard } from './strategies/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {

  constructor(private authService: AuthService, private readonly usersService: UsersService){}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request()req) {
    return this.authService.login(req.user);
  }

  /*@UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
      return req.user;
  }   */

  @UseGuards(JwtAuthGuard)
  @Get('users/profile')
  getProfile(@Request() req){
    return req.user;
  }
}
