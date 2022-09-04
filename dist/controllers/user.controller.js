"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    static getAll = async (req, res, next) => {
        const { where, sort, get } = req.query;
        const data = await user_service_1.UserService.getAll({
            where,
            get,
            sort,
        });
        res.json(data);
    };
    static create = async (req, res, next) => {
        const data = await user_service_1.UserService.create(req.body?.fields);
        res.json(req.body);
    };
}
exports.UserController = UserController;
