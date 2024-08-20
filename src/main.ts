import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BigIntInterceptor } from './interceptors/bigint.interceptor';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';
import { CustomValidationPipe } from './common/validation/custom-validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('GPD API')
  .setDescription('Descirpción de uso de la API del proyecto GPD')
  .setVersion('1.0')
  .addTag('gpd')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new BigIntInterceptor());
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3000);
}
bootstrap();
