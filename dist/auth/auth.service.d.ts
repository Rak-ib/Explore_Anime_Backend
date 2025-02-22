import { User } from './schema/user.schema';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/create-login.dto';
import { Response } from 'express';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: mongoose.Model<User>, jwtService: JwtService);
    createUser(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    loginUser(loginDto: LoginDto, res: Response): Promise<void>;
    checkAuth(authToken: string): Promise<{
        username: string;
    }>;
}
