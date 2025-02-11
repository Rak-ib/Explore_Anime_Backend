import { IsEmpty, IsIn, IsNotEmpty,  IsString} from "class-validator";
import { User } from "../../auth/schema/user.schema";
import { ApiProperty } from "@nestjs/swagger";


export class CreateAnimeDto{
    @ApiProperty({description:'Name of the anime',example:"Naruto"})
    @IsNotEmpty()
    @IsString()
    anime_name:string;

    @ApiProperty({description:'Image link for the anime'})
    @IsNotEmpty()
    @IsString()
    image_link:string;

    @ApiProperty({description:'Description about the anime'})
    @IsNotEmpty()
    @IsString()
    description:string;

    @ApiProperty({description:'Link for more details about the anime'})
    @IsNotEmpty()
    @IsString()
    readMore_link:string;

    @ApiProperty({description:'Category',enum:[
      'Adventure',
      'Drama',
      'Fantasy',
      'Action',
      'Sci-Fi',
      'Suspense',
      'Comedy',
      'Award Winning',
    ]})
    @IsNotEmpty()
    @IsString()
    @IsIn(['Adventure',
    'Drama',
    'Fantasy',
    'Action',
    'Sci-Fi',
    'Suspense',
    'Comedy',
    'Award Winning'])
    category:string

    @ApiProperty({ description: 'ID of the anime', readOnly: true })
    readonly _id:string

    @ApiProperty({
        description: 'User who created the anime',
        type: () => User,
        readOnly: true,
      })
    @IsEmpty()
    readonly user:User

}