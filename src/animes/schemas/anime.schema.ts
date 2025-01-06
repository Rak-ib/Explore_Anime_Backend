import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({
    timestamps:true
})
export class Anime extends Document {
    @Prop({required:true,unique:true})
    anime_name:string;
    @Prop({required:true})
    image_link:string;
    @Prop({required:true})
    description:string;
    @Prop({required:true})
    readMore_link:string;
    @Prop({enum:['Adventure',
    'Drama',
    'Fantasy',
    'Action',
    'Sci-Fi',
    'Suspense',
    'Comedy',
    'Award Winning'],type:String})
    category:string;
}
export const AnimeSchema=SchemaFactory.createForClass(Anime)