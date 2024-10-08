import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*', // Allows all origins
  });

  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(3000);
}
bootstrap();
