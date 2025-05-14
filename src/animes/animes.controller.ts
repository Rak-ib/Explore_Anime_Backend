import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post, 
    Query, 
    Req, 
    UseGuards 
} from "@nestjs/common";
import { AnimeService } from "./animes.service";
import { Anime } from "./schemas/anime.schema";
import { UpdateAnimeDto } from "./dto/update-anime.dto";
import { CreateAnimeDto } from "./dto/create-anime.dto";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Anime")
@Controller("anime") // Changed from "animes" to "anime" for consistency
export class AnimeController {
    constructor(private readonly animeService: AnimeService) {}

    @Get()
    @ApiQuery({ name: "page", required: false, description: "Page number for pagination" })
    @ApiQuery({ name: "title", required: false, description: "Filter by title" })
    @ApiQuery({ name: "status", required: false, description: "Filter by status (Ongoing, Completed, Upcoming)" })
    @ApiQuery({ name: "genre", required: false, description: "Filter by genre" })
    @ApiOperation({ summary: "Retrieve all anime with pagination and filtering" })
    @ApiResponse({ status: 200, description: "Paginated list of anime entries" })
    async getAllAnime(@Query() query: Record<string, string>): Promise<{ data: Anime[]; metadata: any }> {
        console.log("find all come here");
        return this.animeService.findAll(query);
    }

    @Post()
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiOperation({ summary: "Create a new anime entry" })
    @ApiResponse({ status: 201, description: "Anime created successfully" })
    @ApiResponse({ status: 400, description: "Bad request (e.g., duplicate title)" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    async createAnime(@Body() anime: CreateAnimeDto, @Req() req): Promise<Anime> {
        console.log("did it come here ")
        return this.animeService.createAnime(anime, req.user);
    }

    @Get(":id")
    @ApiOperation({ summary: "Retrieve an anime by ID" })
    @ApiResponse({ status: 200, description: "Anime details" })
    @ApiResponse({ status: 400, description: "Invalid ID format" })
    @ApiResponse({ status: 404, description: "Anime not found" })
    async getAnime(@Param("id") id: string): Promise<Anime> {
        return this.animeService.findAnime(id);
    }

    @Patch(":id")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiOperation({ summary: "Update an anime by ID" })
    @ApiResponse({ status: 200, description: "Updated anime details" })
    @ApiResponse({ status: 400, description: "Invalid ID format" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 404, description: "Anime not found" })
    async updateAnime(@Param("id") id: string, @Body() anime: UpdateAnimeDto): Promise<Anime> {
        return this.animeService.updateById(id, anime);
    }

    @Delete(":id")
    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @ApiOperation({ summary: "Delete an anime by ID" })
    @ApiResponse({ status: 200, description: "Anime deleted successfully" })
    @ApiResponse({ status: 400, description: "Invalid ID format" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 404, description: "Anime not found" })
    async deleteAnime(@Param("id") id: string): Promise<{ deleted: boolean }> {
        return this.animeService.deleteById(id);
    }
}