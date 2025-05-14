import { BadRequestException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
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


    async createUser(userDto: CreateUserDto, res: Response): Promise<void> {
        const session = await this.userModel.db.startSession();
        session.startTransaction();
      
        try {
          const { userName, email, password } = userDto;
      
          // Check if user exists
          const existingUser = await this.userModel.findOne({
            $or: [{ email }, { userName }]
          });
          if (existingUser) {
            throw new BadRequestException('User already exists');
          }
      
          // Hash password and create user
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await this.userModel.create([{
            userName,
            email,
            password: hashedPassword
          }], { session });
      
          // Generate JWT and set cookie
          const token = this.jwtService.sign({ id: user[0]._id });
          res.cookie('authToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
          });
      
          await session.commitTransaction();
          session.endSession();
      
          // Return success response
          res.status(201).json({ message: 'Registration successful', username: user[0].userName });
        } catch (error) {
          await session.abortTransaction();
          session.endSession();
          throw new BadRequestException(error.message);
        }
      }

    async loginUser(loginDto: LoginDto, res: Response): Promise<void> {
        try {
            const { identifier, password } = loginDto;
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
            const user = isEmail ? await this.userModel.findOne({ email: identifier }) :
                                   await this.userModel.findOne({ userName: identifier });
    
            if (!user) {
                throw new UnauthorizedException(`Invalid ${isEmail ? 'email' : 'username'}`);
            }
            console.log("hey everyone")
    
            const isPasswordMatched = await bcrypt.compare(password, user.password);
            if (!isPasswordMatched) {
                throw new UnauthorizedException('Wrong Password');
            }
            console.log("okay")
    
            const token = this.jwtService.sign({ id: user._id });
            res.cookie('authToken', token, {
                httpOnly: true, 
                secure: true,  
                sameSite: 'none',  
                path: '/',  
                maxAge: 24 * 60 * 60 * 1000, 
            });
            

            res.status(200).json({ message: 'Login successful',username:user.userName});
    
        } catch (error) {

            throw new BadRequestException(error.message);
        }
    }

    async checkAuth(authToken:string):Promise<{username:string}>{
        if (!authToken) {
            throw new UnauthorizedException("No token found");
          }
          try {
            const decoded = this.jwtService.verify(authToken);
            const user = await this.userModel.findById(decoded.id);
            if (!user) throw new UnauthorizedException('Invalid user');
            return { username: user.userName };
          } catch {
            throw new UnauthorizedException('Invalid or expired token');
          }
    }
    
    async logoutUser(@Res() res: Response) {
    // Clear the authToken cookie
    try {
      res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict',
    });

    return res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
    } catch (error) {
      throw new UnauthorizedException('failed to logout',error)
    }
  }
    
}
