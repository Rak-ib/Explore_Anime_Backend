import { Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-login.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  @ApiOperation({ summary: 'Signup ' })
  @ApiResponse({ status: 201, description: '' })
  async createUser(@Body() user: CreateUserDto) {
    return await this.authService.createUser(user);
  }
  @Post('/login')
  async loginUser(@Body() user: LoginDto, @Res() res: Response) {
    console.log("new")
    return await this.authService.loginUser(user, res);
  }

  @Get('/check-auth')
  @ApiOperation({ summary: 'check is logged in ' })
  @ApiResponse({ status: 201, description: 'Okay good' })
  async checkAuth(@Req() req) {
    const authToken=req.cookies.authToken;
    console.log("auth has been called",authToken)
    if(!authToken){
        console.log("okay")
        throw new UnauthorizedException();
    }
    return this.authService.checkAuth(authToken)
    
    
  }
}
