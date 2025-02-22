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
            console.log('Received DTO:', userDto);
            const existingUser = await this.userModel.findOne({
                $or: [{ user_email }, { user_name }]
            });
            if (existingUser) {
                throw new common_1.BadRequestException('User already exists');
            }
            const hashedPassword = await bcrypt.hash(user_password, 10);
            const user = await this.userModel.create([
                {
                    user_name: user_name,
                    user_email: user_email,
                    user_password: hashedPassword
                }
            ], { session });
            const token = this.jwtService.sign({ id: user[0]._id });
            await session.commitTransaction();
            session.endSession();
            return { token };
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw new common_1.BadRequestException(error.message);
        }
    }
    async loginUser(loginDto, res) {
        try {
            const { identifier, user_password } = loginDto;
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
            const user = isEmail ? await this.userModel.findOne({ user_email: identifier }) :
                await this.userModel.findOne({ user_name: identifier });
            if (!user) {
                throw new common_1.UnauthorizedException(`Invalid ${isEmail ? 'email' : 'username'}`);
            }
            console.log("hey everyone");
            const isPasswordMatched = await bcrypt.compare(user_password, user.user_password);
            if (!isPasswordMatched) {
                throw new common_1.UnauthorizedException('Wrong Password');
            }
            console.log("okay");
            const token = this.jwtService.sign({ id: user._id });
            console.log("token", token);
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ message: 'Login successful', username: user.user_name, token });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async checkAuth(authToken) {
        console.log("eikhane");
        if (!authToken) {
            throw new common_1.UnauthorizedException("No token found");
        }
        try {
            console.log("at least come here ");
            const decoded = this.jwtService.verify(authToken);
            console.log("decode", decoded);
            const user = await this.userModel.findById(decoded.id);
            console.log("user", user);
            if (!user)
                throw new common_1.UnauthorizedException('Invalid user');
            return { username: user.user_name };
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map