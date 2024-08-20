import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { jwtConstants } from 'src/auth/constants';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { AuthController } from 'src/auth/auth.controller';
import { PrismaErrorHandler } from 'src/common/validation/prisma-error-handler';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UsersService, PrismaService, PrismaErrorHandler],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
