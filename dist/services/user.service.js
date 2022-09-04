"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const models_1 = require("../utils/models");
class UserService {
    static getAll = async (config) => {
        return await user_model_1.User.findAll({
            attributes: (0, models_1.buildModelGet)({
                model: user_model_1.User,
                get: config?.get,
                _ignoreProtection: config?._ignoreProtection,
            }),
            where: (0, models_1.buildModelWhere)({
                model: user_model_1.User,
                where: config?.where,
                _ignoreProtection: config?._ignoreProtection,
            }),
            order: (0, models_1.buildModelSort)({
                model: user_model_1.User,
                sort: config?.sort,
                _ignoreProtection: config?._ignoreProtection,
            }),
        });
    };
    static getOne = async (config) => {
        return await user_model_1.User.findOne({
            attributes: (0, models_1.buildModelGet)({
                model: user_model_1.User,
                get: config?.get,
                _ignoreProtection: config?._ignoreProtection,
            }),
            where: (0, models_1.buildModelWhere)({
                model: user_model_1.User,
                where: config?.where,
                _ignoreProtection: config?._ignoreProtection,
            }),
        });
    };
    static create = async (fields) => {
        try {
            const user = await user_model_1.User.create(fields);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            return 1;
        }
    };
}
exports.UserService = UserService;
