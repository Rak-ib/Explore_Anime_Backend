import { IsArray, IsEmpty, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../auth/schema/user.schema";

export class StreamingLinkDto {
  @IsNotEmpty()
  @IsString()
  quality: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}

export class EpisodeDto {
  @IsNotEmpty()
  @IsNumber()
  episode_number: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  aired_date: string;

  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsString()
  video_url: string;
}
export class VoiceActorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  language: string;
}

export class CharacterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => VoiceActorDto)
  voice_actor: VoiceActorDto;

  @IsOptional()
  @IsString()
  image: string;
}



export class ReviewDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}

export class CreateAnimeDto {
  @ApiProperty({ example: "Attack on Titan" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: "進撃の巨人" })
  @IsOptional()
  @IsString()
  japanese_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  synopsis: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  release_date: string;

  @ApiProperty()
  @IsOptional()
  @IsIn(["Ongoing", "Completed", "Upcoming"])
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  episodes: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  duration_per_episode: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  rating: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  studio: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  producer: string[];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  score: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  popularity_rank: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cover_image: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  trailer_url: string;

  @ApiProperty({ type: [StreamingLinkDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => StreamingLinkDto)
  streaming_links: StreamingLinkDto[];

  @ApiProperty({ type: [EpisodeDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EpisodeDto)
  episodes_list: EpisodeDto[];

  @ApiProperty({ type: [CharacterDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CharacterDto)
  characters: CharacterDto[];

  @ApiProperty({ type: [ReviewDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ReviewDto)
  reviews: ReviewDto[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  related_anime: string[];

  @ApiProperty()
  @IsEmpty()
  readonly user: User;
}
