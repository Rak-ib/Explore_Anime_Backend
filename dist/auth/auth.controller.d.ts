import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-login.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    createUser(user: CreateUserDto, res: Response): Promise<void>;
    loginUser(user: LoginDto, res: Response): Promise<void>;
    checkAuth(req: any): Promise<{
        username: string;
    }>;
    logout(res: any): Promise<Response<any, Record<string, any>>>;
}
