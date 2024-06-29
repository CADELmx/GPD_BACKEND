import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PartialTemplatesModule } from './partial-templates/partial-templates.module';

@Module({
  imports: [AuthModule, UsersModule, PartialTemplatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
