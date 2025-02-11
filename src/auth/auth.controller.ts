import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-login.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService

    ){}
    @Post('/signup')
    @ApiOperation({summary:"Signup "})
    @ApiResponse({status:201,description:""})
    async createUser(
        @Body() user:CreateUserDto
    ){
        return await this.authService.createUser(user)

    }
    @Post('/login')
    async loginUser(
        @Body() user:LoginDto
    ){
        return await this.authService.loginUser(user);
    }
}
