"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const controllers_1 = require("../utils/controllers");
class UserController {
    static getAll = (0, controllers_1.asyncControllerRequest)(async (req, res, next) => {
        const { where, sort, get } = req.query;
        const data = await user_service_1.UserService.getAll({
            where,
            get,
            sort,
        });
        res.json(data);
    });
    static create = (0, controllers_1.asyncControllerRequest)(async (req, res, next) => {
        const data = await user_service_1.UserService.create(req.body?.fields);
        res.json(req.body);
    });
}
exports.UserController = UserController;
