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
exports.CreateAnimeDto = void 0;
const class_validator_1 = require("class-validator");
const user_schema_1 = require("../../auth/schema/user.schema");
const swagger_1 = require("@nestjs/swagger");
class CreateAnimeDto {
}
exports.CreateAnimeDto = CreateAnimeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the anime', example: "Naruto" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnimeDto.prototype, "anime_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Image link for the anime' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnimeDto.prototype, "image_link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description about the anime' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnimeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Link for more details about the anime' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnimeDto.prototype, "readMore_link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Category', enum: [
            'Adventure',
            'Drama',
            'Fantasy',
            'Action',
            'Sci-Fi',
            'Suspense',
            'Comedy',
            'Award Winning',
        ] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['Adventure',
        'Drama',
        'Fantasy',
        'Action',
        'Sci-Fi',
        'Suspense',
        'Comedy',
        'Award Winning']),
    __metadata("design:type", String)
], CreateAnimeDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the anime', readOnly: true }),
    __metadata("design:type", String)
], CreateAnimeDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User who created the anime',
        type: () => user_schema_1.User,
        readOnly: true,
    }),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", user_schema_1.User)
], CreateAnimeDto.prototype, "user", void 0);
//# sourceMappingURL=create-anime.dto.js.map