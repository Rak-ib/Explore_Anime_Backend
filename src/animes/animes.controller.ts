import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
// import { BookService } from "./books.service";
// import { Book } from "./schemas/book.schema";
// import { CreateBookDto } from "./dto/create-book.dto";
// import { UpdateBookDto } from "./dto/update-book.dto";
import { AnimeService } from "./animes.service";
import { Anime } from "./schemas/anime.schema";
import { UpdateAnimeDto } from "./dto/update-anime.dto";
import { CreateAnimeDto } from "./dto/create-anime.dto";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

// import { Query as ExpressQuery } from "express-serve-static-core";
@ApiTags('Anime')
@Controller('animes')
export class AnimeController{
    constructor(private animeService:AnimeService){
        console.log('zero')
    }

    @Get()
    @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination' })
    @ApiOperation({summary:"Retrieve all anime details"})
    @ApiResponse({
        status:200,
        description:'A list of all anime entries'
    })
    async getAllBooks(@Query() query:Record<string,string>):Promise<{data:Anime[],metadata:any}>{
        return this.animeService.findAll(query);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({summary:'Create a new anime entry'})
    @ApiResponse({status:201,description:"anime created successfully"})
    @ApiResponse({status:403,description:"Forbidden"})
    async createAnime(
        @Body() anime:CreateAnimeDto,
        @Req() req,
    ):Promise<Anime>{
        console.log('first');
        console.log(req)
        return this.animeService.createAnime(anime,req.user)

    }
    @Get(':id')
    @ApiOperation({summary:"'Update an anime by ID'"})
    @ApiResponse({status:201,description:'The anime has been updated successfully.'})
    async getAnime(
        @Param('id')
        id:string
    ){
        return await this.animeService.findAnime(id);
    }

    @Patch(':id')
    @ApiOperation({summary:''})
    @ApiResponse({
        status: 200,
        description: 'The anime has been updated successfully.',
      })
    @ApiResponse({ status: 404, description: 'Anime not found.' })
    async UpdateAnime(
        @Param('id')
        id:string,
        @Body() anime:UpdateAnimeDto
    ){
        return this.animeService.updateById(id,anime)
    }
}