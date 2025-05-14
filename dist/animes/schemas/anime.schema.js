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
const user_schema_1 = require("../../auth/schema/user.schema");
let Anime = class Anime extends mongoose_2.Document {
};
exports.Anime = Anime;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Anime.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "japanese_title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Anime.prototype, "synopsis", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], Anime.prototype, "genres", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "release_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ["Ongoing", "Completed", "Upcoming"], default: "Ongoing" }),
    __metadata("design:type", String)
], Anime.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Anime.prototype, "episodes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "duration_per_episode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "studio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], Anime.prototype, "producer", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Anime.prototype, "score", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Anime.prototype, "popularity_rank", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "cover_image", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "trailer_url", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            quality: { type: String },
            url: { type: String },
        },
    ]),
    __metadata("design:type", Array)
], Anime.prototype, "streaming_links", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            episode_number: String,
            title: String,
            aired_date: String,
            thumbnail: String,
            video_url: String,
        },
    ]),
    __metadata("design:type", Array)
], Anime.prototype, "episodes_list", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            name: String,
            role: String,
            voice_actor: {
                name: String,
                language: String,
            },
            image: String,
        },
    ]),
    __metadata("design:type", Array)
], Anime.prototype, "characters", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            username: String,
            rating: Number,
            comment: String,
        },
    ]),
    __metadata("design:type", Array)
], Anime.prototype, "reviews", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.default.Schema.Types.ObjectId, ref: "Anime" }]),
    __metadata("design:type", Array)
], Anime.prototype, "related_anime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: "User" }),
    __metadata("design:type", user_schema_1.User)
], Anime.prototype, "user", void 0);
exports.Anime = Anime = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Anime);
exports.AnimeSchema = mongoose_1.SchemaFactory.createForClass(Anime);
//# sourceMappingURL=anime.schema.js.map