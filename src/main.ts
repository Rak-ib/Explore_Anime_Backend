import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://exploreanime.vercel.app', // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Explore Anime API')
    .setDescription('API documentation for Explore Anime projects')
    .setVersion('1.0')
    .addBearerAuth() // Add JWT authentication to Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Explicitly serve Swagger UI at a custom path (e.g., '/swagger')
  SwaggerModule.setup('swagger', app, document);

  console.log('Swagger is set up at /swagger');  // Change to '/swagger'

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log('fine');
}
bootstrap();
