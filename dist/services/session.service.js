"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const session_model_1 = require("../models/session.model");
const models_1 = require("../utils/models");
class SessionService {
    static getAll = async (config) => {
        const attributes = (0, models_1.buildModelGet)({
            model: session_model_1.Session,
            get: config?.get,
            _ignoreProtection: config?._ignoreProtection,
            _getRaw: config?._getRaw,
            _getRawUnsafe: config?._getRawUnsafe,
        });
        const where = (0, models_1.buildModelWhere)({
            model: session_model_1.Session,
            where: config?.where,
            _ignoreProtection: config?._ignoreProtection,
            _whereRaw: config?._whereRaw,
            _whereRawUnsafe: config?._whereRawUnsafe,
        });
        const order = (0, models_1.buildModelSort)({
            model: session_model_1.Session,
            sort: config?.sort,
            _ignoreProtection: config?._ignoreProtection,
            _sortRaw: config?._sortRaw,
            _sortRawUnsafe: config?._sortRawUnsafe,
        });
        const limit = (0, models_1.buildModelLimit)({
            limit: config?.limit,
            _limitRawUnsafe: config?._limitRawUnsafe,
        });
        return await session_model_1.Session.findAll({
            attributes,
            where,
            order,
            limit,
        });
    };
    static create = async (fields) => {
        try {
            const session = await session_model_1.Session.create(fields);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            return 1;
        }
    };
}
exports.SessionService = SessionService;
