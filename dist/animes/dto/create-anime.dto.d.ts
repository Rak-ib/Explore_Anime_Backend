import { User } from "../../auth/schema/user.schema";
export declare class CreateAnimeDto {
    anime_name: string;
    image_link: string;
    description: string;
    readMore_link: string;
    category: string;
    readonly _id: string;
    readonly user: User;
}
