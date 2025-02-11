import { Module } from "@nestjs/common";
// import { BookController } from "src/book/book.controller";
// import { Service } from "./books.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AnimeService } from "./animes.service";
import { Anime, AnimeSchema } from "./schemas/anime.schema";
import { AnimeController } from "./animes.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports:[
        AuthModule,
        MongooseModule.forFeature([{name:Anime.name,schema:AnimeSchema}])],
    controllers:[AnimeController],
    providers:[AnimeService]
})
export class AnimesModule{

}