import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AreasModule } from './areas/areas.module';
import { SubjectModule } from './subject/subject.module';
import { TemplatesModule } from './templates/templates.module';
import { PrismaErrorHandler } from './common/validation/prisma-error-handler';
import { PartialTemplatesModule } from './partial-templates/partial-templates.module';
import { EducationalProgramsModule } from './educational-programs/educational-programs.module';
import { ActivityModule } from './activity/activity.module';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    EducationalProgramsModule,
    TemplatesModule,
    PartialTemplatesModule,
    SubjectModule,
    AreasModule,
    ActivityModule
  ],
  controllers: [AppController],
  providers: [
    PrismaErrorHandler,
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
  exports: [PrismaErrorHandler],
})
export class AppModule {}
