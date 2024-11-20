import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from 'src/models/user/create-user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @HttpCode(200)
  @Post('auth/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.signIn(email, password);
  }
  @Public()
  @HttpCode(201)
  @Post('auth/signup')
  async register(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }
}
