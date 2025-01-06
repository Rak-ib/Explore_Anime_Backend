import { Document } from "mongoose";
export declare class Anime extends Document {
    anime_name: string;
    image_link: string;
    description: string;
    readMore_link: string;
    category: string;
}
export declare const AnimeSchema: import("mongoose").Schema<Anime, import("mongoose").Model<Anime, any, any, any, Document<unknown, any, Anime> & Anime & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Anime, Document<unknown, {}, import("mongoose").FlatRecord<Anime>> & import("mongoose").FlatRecord<Anime> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
