"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = require("../config");
const token_service_1 = require("../services/token.service");
const session_service_1 = require("./session.service");
const user_service_1 = require("../services/user.service");
const bcrypt_1 = require("bcrypt");
const is_1 = require("../utils/is");
class AuthService {
    static login = async (config) => {
        if (!(0, is_1.isString)(config.email) || !(0, is_1.isString)(config.password)) {
            throw new Error("Missing email and password");
        }
        if (!(0, is_1.isString)(config.fingerprint)) {
            throw new Error("Missing device fingerprint");
        }
        const user = (await user_service_1.UserService.getAll({
            _ignoreProtection: true,
            _whereRawUnsafe: { email: config.email },
            limit: 1,
        }))[0];
        if (!user || !Object.keys(user).length) {
            throw new Error("User credentials was invalid or user was not found");
        }
        const isPasswordMatching = await (0, bcrypt_1.compare)(config.password, user.password);
        if (!isPasswordMatching) {
            throw new Error("User credentials was invalid or user was not found");
        }
        const tokens = token_service_1.TokenService.generate({
            userId: user.id,
        });
        const session = await session_service_1.SessionService.create({
            fields: {
                fingerprint: config.fingerprint,
                expiresIn: tokens.refreshToken.expirationDate.toDateString(),
                refreshToken: tokens.refreshToken.value,
                UserId: user.id,
            },
        });
        // WARNING MAX SESSIONS NEEDS TO BE IMPLEMENTED
        /*
        if (sessionCurrrentAmount > MAX_AMOUNT) { update some session DONT CREATE NEW ONE }
        */
        // So the problem here is expired sessions stored inside session db
        if (!session) {
            throw new Error("Error was thrown while trying to create session");
        }
        return tokens;
    };
    static logout = async (config) => {
        if (!(0, is_1.isString)(config.refreshToken)) {
            // not throw error for now just return
            return;
        }
        if (!token_service_1.TokenService.verify(config.refreshToken, config_1.CONFIG.JWT_REFRESH_SECRET)) {
            // throw new Error("Validation");
            // not throw error for now just delete it
        }
        return await session_service_1.SessionService.delete({
            _whereRawUnsafe: { refreshToken: config.refreshToken },
        });
    };
    static refresh = async (config) => {
        if (!(0, is_1.isString)(config.refreshToken)) {
            throw new Error("Missing refreshToken");
        }
        const data = token_service_1.TokenService.verify(config.refreshToken, config_1.CONFIG.JWT_REFRESH_SECRET);
        if (!data) {
            throw new Error("Refreshtoken is invalid or was not found");
        }
        let session = (await session_service_1.SessionService.getAll({
            _ignoreProtection: true,
            _whereRawUnsafe: { refreshToken: config.refreshToken },
            limit: 1,
        }))[0];
        if (!session || !Object.keys(session).length) {
            throw new Error("Refreshtoken is invalid or was not found");
        }
        // So the problem here is expired sessions stored inside session db
        if (session.fingerprint !== config.fingerprint) {
            throw new Error("Called refresh from new device. You must to login and create new session instead of updating it here!");
        }
        const tokens = token_service_1.TokenService.generate({
            userId: data.userId,
        });
        await session_service_1.SessionService.update({
            fields: {
                refreshToken: tokens.refreshToken.value,
                expiresIn: tokens.refreshToken.expirationDate.toDateString(),
            },
            _whereRawUnsafe: {
                fingerprint: config.fingerprint,
                refreshToken: config.refreshToken,
                UserId: data.userId,
            },
        });
        // So the problem here is expired sessions stored inside session db
        return tokens;
    };
}
exports.AuthService = AuthService;
