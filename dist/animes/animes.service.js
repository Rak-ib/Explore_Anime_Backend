"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const anime_schema_1 = require("./schemas/anime.schema");
let AnimeService = class AnimeService {
    constructor(animeModel) {
        this.animeModel = animeModel;
    }
    async findAll(query) {
        console.log(query);
        const limit = 5;
        const page = Number(query.page) || 1;
        const skip = limit * (page - 1);
        const filter = {};
        if (query.anime_name) {
            filter.anime_name = {
                $regex: query.anime_name,
                $options: 'i'
            };
        }
        if (query.category) {
            filter.category = {
                $regex: query.category,
                $options: 'i'
            };
        }
        console.log('form animeService', filter);
        const allAnime = await this.animeModel.find(filter).limit(limit).skip(skip).exec();
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
    async createAnime(anime, user) {
        const data = Object.assign(anime, { user: user._id });
        const res = await this.animeModel.create(data);
        return res;
    }
    async findAnime(id) {
        const isValid = mongoose_2.default.isValidObjectId(id);
        if (!isValid) {
            throw new common_1.BadRequestException("Enter valid ID");
        }
        const anime = await this.animeModel.findById(id);
        if (!anime) {
            throw new common_1.NotFoundException("Book not found");
        }
        return anime;
    }
    async updateById(id, anime) {
        const updatedAnime = await this.animeModel.findByIdAndUpdate(id, anime, { new: true, runValidators: true }).exec();
        if (!updatedAnime) {
            throw new common_1.NotFoundException("anime Not found");
        }
        return updatedAnime;
    }
};
exports.AnimeService = AnimeService;
exports.AnimeService = AnimeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(anime_schema_1.Anime.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], AnimeService);
//# sourceMappingURL=animes.service.js.map