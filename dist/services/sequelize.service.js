"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeService = void 0;
const sequelize_1 = require("sequelize");
exports.SequelizeService = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: "db/database.sqlite",
});
