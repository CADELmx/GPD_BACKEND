
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { PrismaService } from '../prisma.service';
import { UsersController } from '../users/users.controller';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, PrismaService, PrismaErrorHandler],
  exports: [AuthService],
  controllers: [AuthController, UsersController],
})
export class AuthModule {}
