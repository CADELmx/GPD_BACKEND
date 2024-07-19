import { Controller, Post, HttpCode, Body, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Public()
  @HttpCode(200)
  @Post('auth/login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.signIn(email, password);
  }
}
