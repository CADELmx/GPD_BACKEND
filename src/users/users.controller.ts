import { Body, Controller, Delete, Get, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from 'src/models/user/update-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';

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
  @Get('/profile/data')
  async getProfileData(@Request() req) {
    console.log(req.user.username);
    const email = (req.user.username);
    const { data, error, message } = await this.usersService.findUserJoinPersonalData(email);
    const { password, ...result } = data;
    return {
      data: result,
      error,
      message
    };
  }
  @Post('update')
  async updateUser(
    @Request() req,
    @Body() data: UpdateUserDto
  ) {
    const userId = BigInt(req.user.id);
    return this.usersService.updateUser(userId, data);
  }
  @Post('update/password')
  async updatePassword(
    @Request() req,
    @Body() newPassword: string
  ) {
    const userId = BigInt(req.user.id);
    return this.usersService.updatePassword(userId, newPassword);
  }
  @Delete(':id')
  remove(@Request() req) {
    const userId = BigInt(req.user.id);
    return this.usersService.remove(userId);
  }
  @Public()
  @Get('decript')
  removeMany(@Body('password') password: string) {
    return this.usersService.decrypt(password);
  }
}
