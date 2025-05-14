import { StreamingLinkDto, EpisodeDto, CharacterDto, ReviewDto } from "../dto/create-anime.dto";
export declare class UpdateAnimeDto {
    title: string;
    japanese_title: string;
    synopsis: string;
    genres: string[];
    release_date: string;
    status: string;
    episodes: number;
    duration_per_episode: string;
    streaming_links: StreamingLinkDto[];
    episodes_list: EpisodeDto[];
    characters: CharacterDto[];
    reviews: ReviewDto[];
}
