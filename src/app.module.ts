import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { TemplatesModule } from './templates/templates.module';
import { EducationalProgramsModule } from './educational-programs/educational-programs.module';
import { SubjectModule } from './subject/subject.module';
import { PartialTemplatesModule } from './partial-templates/partial-templates.module';
import { AreasModule } from './areas/areas.module';
import { PrismaErrorHandler } from './common/validation/prisma-error-handler';
import { AuthGuard } from './auth/auth.guard';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    PrismaErrorHandler,
    AuthModule,
    UsersModule,
    EducationalProgramsModule,
    TemplatesModule,
    PartialTemplatesModule,
    SubjectModule,
    AreasModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
