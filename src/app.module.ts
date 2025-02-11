import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimesModule } from './animes/animes.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB}:${process.env.PASS}@cluster0.oylcme6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`),
    AnimesModule,
    AuthModule
  ],
  controllers:[AppController],
  providers:[AppService]
})
export class AppModule {}
