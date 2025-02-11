import { IsNotEmpty, IsString } from "class-validator";



export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    user_name:string;
    @IsNotEmpty()
    @IsString()
    user_email:string;
    @IsNotEmpty()
    @IsString()
    user_password:string;
    
}