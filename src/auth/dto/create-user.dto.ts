import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class CreateUserDto{
    @ApiProperty({description:'user name'})
    @IsNotEmpty()
    @IsString()
    user_name:string;
    @ApiProperty({description:'email'})
    @IsNotEmpty()
    @IsString()
    user_email:string;
    @ApiProperty({description:'password'})
    @IsNotEmpty()
    @IsString()
    user_password:string;
    
}