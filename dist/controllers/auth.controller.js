"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_service_1 = require("../services/user.service");
class AuthController {
    static login = async (req, res, next) => {
        const user = await user_service_1.UserService.getOne({
            where: { email: req.body.fields?.email },
        });
        res.json(user);
    };
    static logout = async () => { };
}
exports.AuthController = AuthController;
