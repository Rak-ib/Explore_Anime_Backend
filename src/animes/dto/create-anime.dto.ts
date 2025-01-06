import { IsIn, IsNotEmpty,  IsString} from "class-validator";


export class CreateAnimeDto{
    @IsNotEmpty()
    @IsString()
    anime_name:string;

    @IsNotEmpty()
    @IsString()
    image_link:string;
    @IsNotEmpty()
    @IsString()
    description:string;
    @IsNotEmpty()
    @IsString()
    readMore_link:string;

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

    readonly _id:string

}