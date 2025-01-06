import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
// import { BookService } from "./books.service";
// import { Book } from "./schemas/book.schema";
// import { CreateBookDto } from "./dto/create-book.dto";
// import { UpdateBookDto } from "./dto/update-book.dto";
import { AnimeService } from "./animes.service";
import { Anime } from "./schemas/anime.schema";
import { UpdateAnimeDto } from "./dto/update-anime.dto";
import { CreateAnimeDto } from "./dto/create-anime.dto";

// import { Query as ExpressQuery } from "express-serve-static-core";

@Controller('animes')
export class AnimeController{
    constructor(private animeService:AnimeService){}

    @Get()
    async getAllBooks(@Query() query:Record<string,string>):Promise<{data:Anime[],metadata:any}>{
        return this.animeService.findAll(query);
    }

    @Post()
    async createAnime(
        @Body() anime:CreateAnimeDto
    ):Promise<Anime>{
        return this.animeService.createAnime(anime)

    }
    @Get(':id')
    async getAnime(
        @Param('id')
        id:string
    ){
        return await this.animeService.findAnime(id);
    }

    @Patch(':id')
    async UpdateAnime(
        @Param('id')
        id:string,
        @Body() anime:UpdateAnimeDto
    ){
        return this.animeService.updateById(id,anime)
    }
}