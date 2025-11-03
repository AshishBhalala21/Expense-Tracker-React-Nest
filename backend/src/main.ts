import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));
  
  // Register global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  // Enable CORS
  app.enableCors();
  
   const configService = app.get(ConfigService);
  const port = parseInt(configService.get('PORT') || '8000', 10);
  
  console.log(`Server is running on port ${port}`);
  await app.listen(port);
}

bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
