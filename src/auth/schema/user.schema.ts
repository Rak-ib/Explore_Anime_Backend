import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema({
    timestamps:true
})
export class User extends Document{
    @Prop({required:true,unique:[true,'user name already taken try another']})
    user_name:string;
    @Prop({required:true,unique:[true,'Email already exist try another']})
    user_email:string;
    @Prop({required:true})
    user_password:string

}
export const userSchema=SchemaFactory.createForClass(User)