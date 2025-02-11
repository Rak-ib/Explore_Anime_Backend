import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
  app.enableCors({
    origin: process.env.FRONTEND_URL, // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,
  });
  const config = new DocumentBuilder()
    .setTitle('Explore Anime API')
    .setDescription('API documentation for Explore Anime projects')
    .setVersion('1.0')
    .addBearerAuth() // Add JWT authentication to Swagger
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log('Swagger is set up at /api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  
    forbidNonWhitelisted: true, 
    transform: true,  
  }));
  await app.listen(process.env.PORT ?? 3000);
  console.log("fine")
}
bootstrap();
