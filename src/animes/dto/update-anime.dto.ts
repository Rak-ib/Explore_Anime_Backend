import { IsIn, IsOptional, IsString } from "class-validator";


export class UpdateAnimeDto{
        @IsOptional()
        @IsString()
        anime_name:string;
    
        @IsOptional()
        @IsString()
        image_link:string;
        @IsOptional()
        @IsString()
        description:string;
        @IsOptional()
        @IsString()
        readMore_link:string;
    
        @IsOptional()
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
    
}