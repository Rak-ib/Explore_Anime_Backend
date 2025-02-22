import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy,ExtractJwt}  from "passport-jwt"
import { User } from "./schema/user.schema";
import { Model } from "mongoose";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => req.cookies.authToken,  // Extract token from cookies
            ]),
            secretOrKey: process.env.JWT_SECRETE
        })
    }

    async validate(payload):Promise<User>{
        console.log(payload)
        const {id}=payload;
        console.log(payload,id,"id paici")
        const user=await this.userModel.findById({_id:id});

        if(!user){
            throw new UnauthorizedException("Please Login Again")
        }

        return user;
    }
}