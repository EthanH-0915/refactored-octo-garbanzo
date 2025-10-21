import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000', // frontend origin
    credentials: true,               // allow cookies (Access-Control-Allow-Credentials)
  });
  
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
