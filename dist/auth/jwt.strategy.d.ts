import { User } from "./schema/user.schema";
import { Model } from "mongoose";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userModel;
    constructor(userModel: Model<User>);
    validate(payload: any): Promise<User>;
}
export {};
