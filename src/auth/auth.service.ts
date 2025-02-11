import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/create-login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel:mongoose.Model<User>,
        private jwtService: JwtService
    ){}

    async createUser(userDto:CreateUserDto):Promise<{token:string}>{
        const session= await this.userModel.db.startSession();
        session.startTransaction()//to control user register in this function
        try {
            const {user_name,user_email,user_password}=userDto;
            console.log(user_name,user_email,user_password);
            const hashedPassword= await bcrypt.hash(user_password,10);
            const user= await this.userModel.create(
                [{
                    user_name,
                    user_email,
                    user_password:hashedPassword
                },
            ],
                {
                    session
                }
            )
            const token=this.jwtService.sign({id:user[0]._id})
            await session.commitTransaction()
            session.endSession()
            return {token}
            } catch (error) {
                await session.abortTransaction();
                session.endSession()
                throw new Error(`${error.message}`)
                
            }
        
        

    }


    async loginUser(loginDto:LoginDto):Promise<{token:string}>{
        const {identifier, user_password}=loginDto;
        const isEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
        const user=isEmail? await this.userModel.findOne({user_email:identifier}):
                    await this.userModel.findOne({user_name:identifier});
        if(!user){
            throw new UnauthorizedException(`invalid ${isEmail?' email':' user name'}`)
        }
        const isPasswordMatched=await bcrypt.compare(user_password,user.user_password);
        if(!isPasswordMatched){
            throw new UnauthorizedException('Wrong Password')
        }
        const token=this.jwtService.sign({id:user._id})
        return {token};
        
    }
}
