import { IsArray, IsIn, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { StreamingLinkDto, EpisodeDto, CharacterDto, ReviewDto } from "../dto/create-anime.dto";

export class UpdateAnimeDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  japanese_title: string;

  @IsOptional()
  @IsString()
  synopsis: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @IsOptional()
  @IsString()
  release_date: string;

  @IsOptional()
  @IsIn(["Ongoing", "Completed", "Upcoming"])
  status: string;

  @IsOptional()
  @IsNumber()
  episodes: number;

  @IsOptional()
  @IsString()
  duration_per_episode: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => StreamingLinkDto)
  streaming_links: StreamingLinkDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EpisodeDto)
  episodes_list: EpisodeDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CharacterDto)
  characters: CharacterDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ReviewDto)
  reviews: ReviewDto[];
}
