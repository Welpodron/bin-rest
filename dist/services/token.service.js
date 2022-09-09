"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ms_1 = __importDefault(require("ms"));
class TokenService {
    static generate = (payload) => {
        const accessTokenMaxAgeMs = (0, ms_1.default)(config_1.CONFIG.JWT_ACCESS_EXPIRES_IN);
        const refreshTokenMaxAgeMs = (0, ms_1.default)(config_1.CONFIG.JWT_REFRESH_EXPIRES_IN);
        const accessTokenExpirationDate = new Date(Date.now() + accessTokenMaxAgeMs);
        const refreshTokenExpirationDate = new Date(Date.now() + refreshTokenMaxAgeMs);
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.CONFIG.JWT_ACCESS_SECRET, {
            expiresIn: accessTokenMaxAgeMs,
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.CONFIG.JWT_REFRESH_SECRET, {
            expiresIn: refreshTokenMaxAgeMs,
        });
        return {
            accessToken: {
                value: accessToken,
                maxAge: accessTokenMaxAgeMs,
                expirationDate: accessTokenExpirationDate,
            },
            refreshToken: {
                value: refreshToken,
                maxAge: refreshTokenMaxAgeMs,
                expirationDate: refreshTokenExpirationDate,
            },
        };
    };
    static verify = (token, secret) => {
        return jsonwebtoken_1.default.verify(token, secret);
    };
}
exports.TokenService = TokenService;
