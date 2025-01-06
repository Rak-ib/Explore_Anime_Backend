import { AnimeService } from "./animes.service";
import { Anime } from "./schemas/anime.schema";
import { UpdateAnimeDto } from "./dto/update-anime.dto";
import { CreateAnimeDto } from "./dto/create-anime.dto";
export declare class AnimeController {
    private animeService;
    constructor(animeService: AnimeService);
    getAllBooks(query: Record<string, string>): Promise<{
        data: Anime[];
        metadata: any;
    }>;
    createAnime(anime: CreateAnimeDto): Promise<Anime>;
    getAnime(id: string): Promise<Anime>;
    UpdateAnime(id: string, anime: UpdateAnimeDto): Promise<Anime>;
}
