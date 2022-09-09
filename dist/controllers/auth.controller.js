"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const controllers_1 = require("../utils/controllers");
class AuthController {
    static login = (0, controllers_1.asyncControllerRequest)(async (req, res, next) => {
        const tokens = await auth_service_1.AuthService.login({
            email: req.body?.fields?.email,
            password: req.body?.fields?.password,
            fingerprint: req?.fingerprint?.hash,
        });
        if (!tokens) {
            throw new Error("Error was found while trying to create tokens");
        }
        res.cookie("refreshToken", tokens.refreshToken.value, {
            maxAge: tokens.refreshToken.maxAge,
            httpOnly: true,
        });
        res.json({
            accessToken: tokens.accessToken.value,
            refreshToken: tokens.refreshToken.value,
        });
    });
    static logout = (0, controllers_1.asyncControllerRequest)(async (req, res, next) => {
        // Await to delete session from db and clear cookies
        await auth_service_1.AuthService.logout({ refreshToken: req.cookies?.refreshToken });
        res.clearCookie("refreshToken", {
            httpOnly: true,
        });
        res.json(true);
    });
    static refresh = (0, controllers_1.asyncControllerRequest)(async (req, res, next) => {
        const tokens = await auth_service_1.AuthService.refresh({
            fingerprint: req?.fingerprint?.hash,
            refreshToken: req.cookies?.refreshToken,
        });
        if (!tokens) {
            throw new Error("Error was found while trying to create tokens");
        }
        res.cookie("refreshToken", tokens.refreshToken.value, {
            maxAge: tokens.refreshToken.maxAge,
            httpOnly: true,
        });
        res.json({
            accessToken: tokens.accessToken.value,
            refreshToken: tokens.refreshToken.value,
        });
    });
}
exports.AuthController = AuthController;
