"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    static login = async (req, res, next) => {
        const tokens = await auth_service_1.AuthService.login({
            email: req.body?.fields?.email,
            password: req.body?.fields?.password,
            fingerprint: req?.fingerprint?.hash,
            oldRefreshToken: req.cookies?.refreshToken,
        });
        if (!tokens) {
            return res.json(false);
        }
        res.cookie("refreshToken", tokens.refreshToken.value, {
            maxAge: tokens.refreshToken.maxAge,
            httpOnly: true,
        });
        res.json({
            accessToken: tokens.accessToken.value,
            refreshToken: tokens.refreshToken.value,
        });
    };
    static logout = async (req, res, next) => {
        // Await to delete session from db and clear cookies
        res.clearCookie("refreshToken", {
            httpOnly: true,
        });
        res.json(true);
    };
}
exports.AuthController = AuthController;
