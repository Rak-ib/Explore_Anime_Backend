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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async createUser(userDto) {
        const session = await this.userModel.db.startSession();
        session.startTransaction();
        try {
            const { user_name, user_email, user_password } = userDto;
            console.log(user_name, user_email, user_password);
            const hashedPassword = await bcrypt.hash(user_password, 10);
            const user = await this.userModel.create([{
                    user_name,
                    user_email,
                    user_password: hashedPassword
                },
            ], {
                session
            });
            const token = this.jwtService.sign({ id: user[0]._id });
            await session.commitTransaction();
            session.endSession();
            return { token };
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw new Error(`${error.message}`);
        }
    }
    async loginUser(loginDto) {
        const { identifier, user_password } = loginDto;
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
        const user = isEmail ? await this.userModel.findOne({ user_email: identifier }) :
            await this.userModel.findOne({ user_name: identifier });
        if (!user) {
            throw new common_1.UnauthorizedException(`invalid ${isEmail ? ' email' : ' user name'}`);
        }
        const isPasswordMatched = await bcrypt.compare(user_password, user.user_password);
        if (!isPasswordMatched) {
            throw new common_1.UnauthorizedException('Wrong Password');
        }
        const token = this.jwtService.sign({ id: user._id });
        return { token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map