import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class CreateUserDto{
    @ApiProperty({description:'userName'})
    @IsNotEmpty()
    @IsString()
    userName:string;
    @ApiProperty({description:'email'})
    @IsNotEmpty()
    @IsString()
    email:string;
    @ApiProperty({description:'password'})
    @IsNotEmpty()
    @IsString()
    password:string;
    
}