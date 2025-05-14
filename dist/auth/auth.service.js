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
    async createUser(userDto, res) {
        const session = await this.userModel.db.startSession();
        session.startTransaction();
        try {
            const { userName, email, password } = userDto;
            const existingUser = await this.userModel.findOne({
                $or: [{ email }, { userName }]
            });
            if (existingUser) {
                throw new common_1.BadRequestException('User already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await this.userModel.create([{
                    userName,
                    email,
                    password: hashedPassword
                }], { session });
            const token = this.jwtService.sign({ id: user[0]._id });
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/',
                maxAge: 24 * 60 * 60 * 1000,
            });
            await session.commitTransaction();
            session.endSession();
            res.status(201).json({ message: 'Registration successful', username: user[0].userName });
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw new common_1.BadRequestException(error.message);
        }
    }
    async loginUser(loginDto, res) {
        try {
            const { identifier, password } = loginDto;
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
            const user = isEmail ? await this.userModel.findOne({ email: identifier }) :
                await this.userModel.findOne({ userName: identifier });
            if (!user) {
                throw new common_1.UnauthorizedException(`Invalid ${isEmail ? 'email' : 'username'}`);
            }
            console.log("hey everyone");
            const isPasswordMatched = await bcrypt.compare(password, user.password);
            if (!isPasswordMatched) {
                throw new common_1.UnauthorizedException('Wrong Password');
            }
            console.log("okay");
            const token = this.jwtService.sign({ id: user._id });
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/',
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ message: 'Login successful', username: user.userName });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async checkAuth(authToken) {
        if (!authToken) {
            throw new common_1.UnauthorizedException("No token found");
        }
        try {
            const decoded = this.jwtService.verify(authToken);
            const user = await this.userModel.findById(decoded.id);
            if (!user)
                throw new common_1.UnauthorizedException('Invalid user');
            return { username: user.userName };
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    async logoutUser(res) {
        try {
            res.clearCookie('authToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
            return res.status(200).json({
                success: true,
                message: 'Logout successful',
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException('failed to logout', error);
        }
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "logoutUser", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map