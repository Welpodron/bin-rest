"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const config_1 = require("../config");
const sequelize_1 = require("sequelize");
const sequelize_service_1 = require("../services/sequelize.service");
const bcrypt_1 = require("bcrypt");
const session_model_1 = require("./session.model");
class User extends sequelize_1.Model {
    static __getSpecialFields = (key) => {
        return Object.entries(this.getAttributes()).filter((attribute) => {
            const [_, options] = attribute;
            return options[key];
        });
    };
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        __isSelectable: true,
        __isSortable: true,
        __isFilterable: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        __isSelectable: true,
        __isSortable: true,
        __isFilterable: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue("password", (0, bcrypt_1.hashSync)(value, config_1.CONFIG.BCRYPT_HASH_ROUNDS));
        },
        validate: {
            notEmpty: true,
        },
        __isSelectable: false,
        __isSortable: false,
        __isFilterable: false,
    },
}, {
    sequelize: sequelize_service_1.SequelizeService,
});
User.hasMany(session_model_1.Session);
