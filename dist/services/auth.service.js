"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const token_service_1 = require("../services/token.service");
const session_service_1 = require("./session.service");
const user_service_1 = require("../services/user.service");
const bcrypt_1 = require("bcrypt");
const is_1 = require("../utils/is");
class AuthService {
    static login = async (config) => {
        throw new Error("Nice error, time to implement center error handler");
        if (!(0, is_1.isString)(config.email) || !(0, is_1.isString)(config.password)) {
            return false;
        }
        if (!(0, is_1.isString)(config.fingerprint)) {
            return false;
        }
        const user = (await user_service_1.UserService.getAll({
            _ignoreProtection: true,
            _whereRawUnsafe: { email: config.email },
            limit: 1,
        }))[0];
        if (!user || !Object.keys(user).length) {
            return false;
        }
        const isPasswordMatching = await (0, bcrypt_1.compare)(config.password, user.password);
        if (!isPasswordMatching) {
            return false;
        }
        const tokens = token_service_1.TokenService.generate({
            userId: user.id,
        });
        // if (config.oldRefreshToken) {
        //   return tokens;
        // }
        const session = await session_service_1.SessionService.create({
            fingerprint: config.fingerprint,
            expiresIn: tokens.refreshToken.expirationDate.toDateString(),
            refreshToken: tokens.refreshToken.value,
            UserId: user.id,
        });
        console.log(session);
        if (!session) {
            return false;
        }
        return tokens;
    };
}
exports.AuthService = AuthService;
