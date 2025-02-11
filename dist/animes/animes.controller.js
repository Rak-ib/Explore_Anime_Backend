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
exports.AnimeController = void 0;
const common_1 = require("@nestjs/common");
const animes_service_1 = require("./animes.service");
const update_anime_dto_1 = require("./dto/update-anime.dto");
const create_anime_dto_1 = require("./dto/create-anime.dto");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
let AnimeController = class AnimeController {
    constructor(animeService) {
        this.animeService = animeService;
        console.log('zero');
    }
    async getAllBooks(query) {
        return this.animeService.findAll(query);
    }
    async createAnime(anime, req) {
        console.log('first');
        console.log(req);
        return this.animeService.createAnime(anime, req.user);
    }
    async getAnime(id) {
        return await this.animeService.findAnime(id);
    }
    async UpdateAnime(id, anime) {
        return this.animeService.updateById(id, anime);
    }
};
exports.AnimeController = AnimeController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Page number for pagination' }),
    (0, swagger_1.ApiOperation)({ summary: "Retrieve all anime details" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'A list of all anime entries'
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnimeController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new anime entry' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "anime created successfully" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Forbidden" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_anime_dto_1.CreateAnimeDto, Object]),
    __metadata("design:returntype", Promise)
], AnimeController.prototype, "createAnime", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "'Update an anime by ID'" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The anime has been updated successfully.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnimeController.prototype, "getAnime", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The anime has been updated successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Anime not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_anime_dto_1.UpdateAnimeDto]),
    __metadata("design:returntype", Promise)
], AnimeController.prototype, "UpdateAnime", null);
exports.AnimeController = AnimeController = __decorate([
    (0, swagger_1.ApiTags)('Anime'),
    (0, common_1.Controller)('animes'),
    __metadata("design:paramtypes", [animes_service_1.AnimeService])
], AnimeController);
//# sourceMappingURL=animes.controller.js.map