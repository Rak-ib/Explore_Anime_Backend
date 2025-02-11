import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: 'https://exploreanime.vercel.app', // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Serve Swagger static assets
  app.useStaticAssets(join(__dirname, '..', 'swagger-ui'));

  const config = new DocumentBuilder()
    .setTitle('Explore Anime API')
    .setDescription('API documentation for Explore Anime projects')
    .setVersion('1.0')
    .addBearerAuth() // Add JWT authentication to Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
  console.log("Swagger is set up at /api");
}
bootstrap();
