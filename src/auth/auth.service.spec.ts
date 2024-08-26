import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { PrismaService } from '../prisma.service';
import { UsersController } from '../users/users.controller';
import { AuthController } from './auth.controller';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
