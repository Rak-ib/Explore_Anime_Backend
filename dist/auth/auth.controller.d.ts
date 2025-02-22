import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-login.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    createUser(user: CreateUserDto): Promise<{
        token: string;
    }>;
    loginUser(user: LoginDto, res: Response): Promise<void>;
    checkAuth(req: any): Promise<{
        username: string;
    }>;
}
