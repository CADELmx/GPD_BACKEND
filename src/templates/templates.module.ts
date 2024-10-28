import { Module } from "@nestjs/common";
import { PrismaErrorHandler } from "../common/validation/prisma-error-handler";
import { PrismaService } from "../prisma.service";
import { TemplatesController } from "./templates.controller";
import { TemplatesService } from "./templates.service";


@Module({
  controllers: [TemplatesController],
  providers: [TemplatesService, PrismaService, PrismaErrorHandler],
})
export class TemplatesModule {}
