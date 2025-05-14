import { AnimeService } from "./animes.service";
import { Anime } from "./schemas/anime.schema";
import { UpdateAnimeDto } from "./dto/update-anime.dto";
import { CreateAnimeDto } from "./dto/create-anime.dto";
export declare class AnimeController {
    private readonly animeService;
    constructor(animeService: AnimeService);
    getAllAnime(query: Record<string, string>): Promise<{
        data: Anime[];
        metadata: any;
    }>;
    createAnime(anime: CreateAnimeDto, req: any): Promise<Anime>;
    getAnime(id: string): Promise<Anime>;
    updateAnime(id: string, anime: UpdateAnimeDto): Promise<Anime>;
    deleteAnime(id: string): Promise<{
        deleted: boolean;
    }>;
}
