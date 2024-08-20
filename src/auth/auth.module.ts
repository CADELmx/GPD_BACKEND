import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersController } from 'src/users/users.controller';
import { PrismaErrorHandler } from 'src/common/validation/prisma-error-handler';

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
