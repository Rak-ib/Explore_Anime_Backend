import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "../../auth/schema/user.schema";

@Schema({ timestamps: true })
export class Anime extends Document {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  japanese_title: string;

  @Prop({ required: true })
  synopsis: string;

  @Prop({ type: [String] })
  genres: string[];

  @Prop()
  release_date: string;

  @Prop({ enum: ["Ongoing", "Completed", "Upcoming"], default: "Ongoing" })
  status: string;

  @Prop()
  episodes: number;

  @Prop()
  duration_per_episode: string;

  @Prop()
  rating: string;

  @Prop()
  studio: string;

  @Prop({ type: [String] })
  producer: string[];

  @Prop()
  score: number;

  @Prop()
  popularity_rank: number;

  @Prop()
  cover_image: string;

  @Prop()
  trailer_url: string;

  @Prop([
    {
      quality: { type: String },
      url: { type: String },
    },
  ])
  streaming_links: { quality: string; url: string }[];

  @Prop([
    {
      episode_number: String,
      title: String,
      aired_date: String,
      thumbnail: String,
      video_url: String,
    },
  ])
  episodes_list: {
    episode_number: string;
    title: string;
    aired_date: string;
    thumbnail: string;
    video_url: string;
  }[];

  @Prop([
    {
      name: String,
      role: String,
      voice_actor: {
        name: String,
        language: String,
      },
      image: String,
    },
  ])
  characters: {
    name: string;
    role: string;
    voice_actor: {
      name: string;
      language: string;
    };
    image: string;
  }[];

  @Prop([
    {
      username: String,
      rating: Number,
      comment: String,
    },
  ])
  reviews: {
    username: string;
    rating: number;
    comment: string;
  }[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Anime" }])
  related_anime: mongoose.Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;
}

export const AnimeSchema = SchemaFactory.createForClass(Anime);
