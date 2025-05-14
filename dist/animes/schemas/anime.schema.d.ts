import mongoose, { Document } from "mongoose";
import { User } from "../../auth/schema/user.schema";
export declare class Anime extends Document {
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
    streaming_links: {
        quality: string;
        url: string;
    }[];
    episodes_list: {
        episode_number: string;
        title: string;
        aired_date: string;
        thumbnail: string;
        video_url: string;
    }[];
    characters: {
        name: string;
        role: string;
        voice_actor: {
            name: string;
            language: string;
        };
        image: string;
    }[];
    reviews: {
        username: string;
        rating: number;
        comment: string;
    }[];
    related_anime: mongoose.Types.ObjectId[];
    user: User;
}
export declare const AnimeSchema: mongoose.Schema<Anime, mongoose.Model<Anime, any, any, any, mongoose.Document<unknown, any, Anime> & Anime & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Anime, mongoose.Document<unknown, {}, mongoose.FlatRecord<Anime>> & mongoose.FlatRecord<Anime> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
