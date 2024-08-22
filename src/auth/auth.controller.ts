import { Post, HttpCode, Body, Get, Request, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from '../models/login/login.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LoginResponse } from './login-response';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Autenticación de usuario'})
  @ApiOkResponse({ type: LoginResponse})
  @Public()
  @HttpCode(200)
  @Post('auth/login')
  async login(
    @Body() loginDto: LoginDto, 
  ) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }
}
