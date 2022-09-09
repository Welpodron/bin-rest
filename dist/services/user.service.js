"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const models_1 = require("../utils/models");
class UserService {
    static getAll = async (config) => {
        const attributes = (0, models_1.buildModelGet)({
            model: user_model_1.User,
            get: config?.get,
            _ignoreProtection: config?._ignoreProtection,
            _getRaw: config?._getRaw,
            _getRawUnsafe: config?._getRawUnsafe,
        });
        const where = (0, models_1.buildModelWhere)({
            model: user_model_1.User,
            where: config?.where,
            _ignoreProtection: config?._ignoreProtection,
            _whereRaw: config?._whereRaw,
            _whereRawUnsafe: config?._whereRawUnsafe,
        });
        const order = (0, models_1.buildModelSort)({
            model: user_model_1.User,
            sort: config?.sort,
            _ignoreProtection: config?._ignoreProtection,
            _sortRaw: config?._sortRaw,
            _sortRawUnsafe: config?._sortRawUnsafe,
        });
        const limit = (0, models_1.buildModelLimit)({
            limit: config?.limit,
            _limitRawUnsafe: config?._limitRawUnsafe,
        });
        return await user_model_1.User.findAll({
            attributes,
            where,
            order,
            limit,
        });
    };
    static create = async (fields) => {
        return await user_model_1.User.create({ ...fields });
    };
}
exports.UserService = UserService;
