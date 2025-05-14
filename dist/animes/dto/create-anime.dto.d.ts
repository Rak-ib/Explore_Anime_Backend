import { User } from "../../auth/schema/user.schema";
export declare class StreamingLinkDto {
    quality: string;
    url: string;
}
export declare class EpisodeDto {
    episode_number: number;
    title: string;
    aired_date: string;
    thumbnail: string;
    video_url: string;
}
export declare class VoiceActorDto {
    name: string;
    language: string;
}
export declare class CharacterDto {
    name: string;
    role: string;
    voice_actor: VoiceActorDto;
    image: string;
}
export declare class ReviewDto {
    username: string;
    rating: number;
    comment: string;
}
export declare class CreateAnimeDto {
    title: string;
    japanese_title: string;
    synopsis: string;
    genres: string[];
    release_date: string;
    status: string;
    episodes: number;
    duration_per_episode: string;
    rating: string;
    studio: string;
    producer: string[];
    score: number;
    popularity_rank: number;
    cover_image: string;
    trailer_url: string;
    streaming_links: StreamingLinkDto[];
    episodes_list: EpisodeDto[];
    characters: CharacterDto[];
    reviews: ReviewDto[];
    related_anime: string[];
    readonly user: User;
}
