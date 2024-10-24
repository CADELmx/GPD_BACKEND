import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../auth/constants";
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaService } from "../prisma.service";
import { PrismaErrorHandler } from "../common/validation/prisma-error-handler";
import { UsersController } from "./users.controller";


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
