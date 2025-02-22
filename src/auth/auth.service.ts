import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/create-login.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel:mongoose.Model<User>,
        private jwtService: JwtService
    ){}

    // async createUser(userDto:CreateUserDto):Promise<{token:string}>{
    //     const session= await this.userModel.db.startSession();
    //     session.startTransaction()//to control user register in this function
    //     try {
    //         const {user_name,user_email,user_password}=userDto;
    //         console.log(user_name,user_email,user_password);
    //         const hashedPassword= await bcrypt.hash(user_password,10);
    //         const user= await this.userModel.create(
    //             [{
    //                 user_name,
    //                 user_email,
    //                 user_password:hashedPassword
    //             },
    //         ],
    //             {
    //                 session
    //             }
    //         )
    //         const token=this.jwtService.sign({id:user[0]._id})
    //         await session.commitTransaction()
    //         session.endSession()
    //         return {token}
    //         } catch (error) {
    //             await session.abortTransaction();
    //             session.endSession()
    //             throw new Error(`${error.message}`)
                
    //         }
        
        

    // }






    async createUser(userDto: CreateUserDto): Promise<{ token: string }> {
        const session = await this.userModel.db.startSession();
        session.startTransaction();

        try {
            const { user_name, user_email, user_password } = userDto;
            console.log('Received DTO:', userDto);

            // Check if user already exists
            const existingUser = await this.userModel.findOne({
                $or: [{ user_email }, { user_name }]
            });
            
            if (existingUser) {
                throw new BadRequestException('User already exists');
            }
            

            // Hash password
            const hashedPassword = await bcrypt.hash(user_password, 10);
            
            const user = await this.userModel.create(
                [
                    {
                        user_name:user_name,
                        user_email:user_email,
                        user_password: hashedPassword
                    }
                ],
                { session }
            );
            const token = this.jwtService.sign({ id: user[0]._id });
            await session.commitTransaction();
            session.endSession();

            return { token };
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw new BadRequestException(error.message);
        }
    }

    async loginUser(loginDto: LoginDto, res: Response): Promise<void> {
        try {
            const { identifier, user_password } = loginDto;
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
            const user = isEmail ? await this.userModel.findOne({ user_email: identifier }) :
                                   await this.userModel.findOne({ user_name: identifier });
    
            if (!user) {
                throw new UnauthorizedException(`Invalid ${isEmail ? 'email' : 'username'}`);
            }
            console.log("hey everyone")
    
            const isPasswordMatched = await bcrypt.compare(user_password, user.user_password);
            if (!isPasswordMatched) {
                throw new UnauthorizedException('Wrong Password');
            }
            console.log("okay")
    
            const token = this.jwtService.sign({ id: user._id });
            console.log("token",token)
    
            // Set the token in an HTTP-only cookie
            res.cookie('authToken', token, {
                httpOnly: true, // Prevents access from JavaScript
                secure: process.env.NODE_ENV === 'production', // Use secure flag in production
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000, // 1-day expiration
            });
            
    
            // Return success message
            res.status(200).json({ message: 'Login successful',username:user.user_name,token });
    
        } catch (error) {
            // Throw exception to notify the user of the error
            throw new BadRequestException(error.message);
        }
    }

    async checkAuth(authToken:string):Promise<{username:string}>{
        console.log("eikhane")
        if (!authToken) {
            throw new UnauthorizedException("No token found");
          }
          try {
            console.log("at least come here ")
            const decoded = this.jwtService.verify(authToken);
            console.log("decode", decoded)
            const user = await this.userModel.findById(decoded.id);
            console.log("user",user);
            if (!user) throw new UnauthorizedException('Invalid user');
            return { username: user.user_name };
          } catch {
            throw new UnauthorizedException('Invalid or expired token');
          }
    }
    
    
    
}
