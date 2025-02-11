import mongoose, { Document } from "mongoose";
import { User } from "../../auth/schema/user.schema";
export declare class Anime extends Document {
    anime_name: string;
    image_link: string;
    description: string;
    readMore_link: string;
    category: string;
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
