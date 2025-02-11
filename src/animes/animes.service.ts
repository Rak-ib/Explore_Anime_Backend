import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
// import { CreateBookDto } from "./dto/create-book.dto";
// import { UpdateBookDto } from "./dto/update-book.dto";
import { Anime } from "./schemas/anime.schema";
import { CreateAnimeDto } from "./dto/create-anime.dto";
import { UpdateAnimeDto } from "./dto/update-anime.dto";
import { User } from "../auth/schema/user.schema";
// import { Query  } from "express-serve-static-core";

@Injectable()
export class AnimeService{
    constructor(
        @InjectModel(Anime.name)
        private animeModel:mongoose.Model<Anime>
    ){
        //console.log('second')
    }

    async findAll(query: Record<string,string>):Promise<{data:Anime[],metadata:any}>{
        console.log(query)
        const limit:number=5;
        const page:number=Number(query.page)||1;
        const skip:number=limit*(page-1);
        const filter:Record<string,any>={};
        if(query.anime_name){
            filter.anime_name={
                $regex:query.anime_name,
                $options:'i'
            }
        }
        if (query.category) {
            filter.category = { 
                $regex: query.category,
                 $options: 'i' };
          }
        console.log('form animeService',filter)
        const allAnime=await this.animeModel.find(filter).limit(limit).skip(skip).exec();
        const numOfAnime= await this.animeModel.countDocuments(filter).exec()
        const totalPages=Math.ceil(numOfAnime/limit)
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
    async createAnime(anime:CreateAnimeDto,user:User):Promise<Anime>{
        // console.log('third')
        const data=Object.assign(anime,{user:user._id})
        const res=await this.animeModel.create(data);
        return res;
    }
    async findAnime(id:string):Promise<Anime>{
        const isValid=mongoose.isValidObjectId(id)
        if(!isValid){
            throw new BadRequestException("Enter valid ID")
        }
        const anime=await this.animeModel.findById(id)
        if(!anime){
            throw new NotFoundException("Book not found")
        }
        return anime;
    }
    async updateById(id:string,anime:UpdateAnimeDto):Promise<Anime>{
        const updatedAnime= await this.animeModel.findByIdAndUpdate(id,anime,{new:true,runValidators:true}).exec()
        if(!updatedAnime){
            throw new NotFoundException("anime Not found")
        }
        return updatedAnime;
    }
}