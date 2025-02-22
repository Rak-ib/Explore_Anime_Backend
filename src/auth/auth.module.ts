import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>{
        return {
          secret:config.get<string>('JWT_SECRETE'),
          signOptions:{
            expiresIn:config.get<string|number>('JWT_EXPIRED')
          }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[PassportModule,JwtStrategy]
})
export class AuthModule {}
