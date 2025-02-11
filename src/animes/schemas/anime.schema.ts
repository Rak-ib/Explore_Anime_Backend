import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "../../auth/schema/user.schema";
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

    @Prop({type:mongoose.Schema.ObjectId, ref:User.name})
    user:User
}
export const AnimeSchema=SchemaFactory.createForClass(Anime)