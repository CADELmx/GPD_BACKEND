import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/profile')
  async getProfile(@Request() req) {
    const userId = BigInt(req.user.id);
    const user = await this.usersService.findUserById(userId);
    const { password, ...result } = user;
    return result;
  }
}
