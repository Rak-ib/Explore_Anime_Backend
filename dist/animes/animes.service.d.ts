import mongoose from "mongoose";
import { Anime } from "./schemas/anime.schema";
import { CreateAnimeDto } from "./dto/create-anime.dto";
import { UpdateAnimeDto } from "./dto/update-anime.dto";
import { User } from "../auth/schema/user.schema";
export declare class AnimeService {
    private animeModel;
    constructor(animeModel: mongoose.Model<Anime>);
    findAll(query: Record<string, string>): Promise<{
        data: Anime[];
        metadata: any;
    }>;
    createAnime(anime: CreateAnimeDto, user: User): Promise<Anime>;
    findAnime(id: string): Promise<Anime>;
    updateById(id: string, anime: UpdateAnimeDto): Promise<Anime>;
}
