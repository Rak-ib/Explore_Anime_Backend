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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeSchema = exports.Anime = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Anime = class Anime extends mongoose_2.Document {
};
exports.Anime = Anime;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Anime.prototype, "anime_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Anime.prototype, "image_link", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Anime.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Anime.prototype, "readMore_link", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['Adventure',
            'Drama',
            'Fantasy',
            'Action',
            'Sci-Fi',
            'Suspense',
            'Comedy',
            'Award Winning'], type: String }),
    __metadata("design:type", String)
], Anime.prototype, "category", void 0);
exports.Anime = Anime = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], Anime);
exports.AnimeSchema = mongoose_1.SchemaFactory.createForClass(Anime);
//# sourceMappingURL=anime.schema.js.map