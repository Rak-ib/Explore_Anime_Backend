import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @ApiProperty({description:'Identifier'})
    @IsNotEmpty()
    @IsString()
    identifier: string;

    @ApiProperty({description:"Password"})
    @IsNotEmpty()
    @IsString()
    password:string;
    
}