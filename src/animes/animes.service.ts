import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Anime } from "./schemas/anime.schema";
import { CreateAnimeDto } from "./dto/create-anime.dto";
import { UpdateAnimeDto } from "./dto/update-anime.dto";
import { User } from "../auth/schema/user.schema";

@Injectable()
export class AnimeService {
    constructor(
        @InjectModel(Anime.name)
        private readonly animeModel: Model<Anime>
    ) {}

    async findAll(query: Record<string, string>): Promise<{ data: Anime[]; metadata: any }> {
        console.log("find all come here2");
        const limit = 5;
        const page = Number(query.page) || 1;
        const skip = limit * (page - 1);
        const filter: Record<string, any> = {};

        if (query.title) {
            filter.title = { $regex: query.title, $options: "i" };
        }

        if (query.status) {
            filter.status = query.status;
        }

        if (query.genre) {
            filter.genres = { $in: [query.genre] };
        }

        const allAnime = await this.animeModel.find(filter)
            .limit(limit)
            .skip(skip)
            .populate('user', 'name email')
            .lean()
            .exec();
            console.log("find all come here3");
        const numOfAnime = await this.animeModel.countDocuments(filter).exec();
        const totalPages = Math.ceil(numOfAnime / limit);

        return {
            data: allAnime,
            metadata: {
                numOfAnime,
                totalPages,
                currentPage: page,
                perPage: limit,
            },
        };
    }

    async createAnime(anime: CreateAnimeDto, user: User): Promise<Anime> {
        console.log("did come here ")
        const data = { ...anime, user: user._id };
        
        // Check if anime with same title already exists
        console.log("did come here ")
        const existingAnime = await this.animeModel.findOne({ title: anime.title });
        if (existingAnime) {
            throw new BadRequestException('Anime with this title already exists');
        }

        return await this.animeModel.create(data);
    }

    async findAnime(id: string): Promise<Anime> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException("Enter a valid ID");
        }

        const anime = await this.animeModel.findById(id)
            .populate('user', 'name email')
            .populate('related_anime', 'title cover_image')
            .lean()
            .exec();
            
        if (!anime) {
            throw new NotFoundException("Anime not found");
        }

        return anime;
    }

    async updateById(id: string, anime: UpdateAnimeDto): Promise<Anime> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException("Enter a valid ID");
        }

        const updatedAnime = await this.animeModel.findByIdAndUpdate(
            id, 
            anime, 
            {
                new: true,
                runValidators: true,
            }
        )
        .populate('user', 'name email')
        .populate('related_anime', 'title cover_image')
        .lean()
        .exec();

        if (!updatedAnime) {
            throw new NotFoundException("Anime not found");
        }

        return updatedAnime;
    }

    async deleteById(id: string): Promise<{ deleted: boolean }> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException("Enter a valid ID");
        }

        const result = await this.animeModel.deleteOne({ _id: id }).exec();
        
        if (result.deletedCount === 0) {
            throw new NotFoundException("Anime not found");
        }

        return { deleted: true };
    }
}