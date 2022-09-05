"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const sequelize_1 = require("sequelize");
const sequelize_service_1 = require("../services/sequelize.service");
class Session extends sequelize_1.Model {
    static __getSpecialFields = (key) => {
        return Object.entries(this.getAttributes()).filter((attribute) => {
            const [_, options] = attribute;
            return options[key];
        });
    };
}
exports.Session = Session;
Session.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        __isSelectable: true,
        __isSortable: true,
        __isFilterable: true,
    },
    fingerprint: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        __isSelectable: false,
        __isSortable: false,
        __isFilterable: false,
    },
    refreshToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        __isSelectable: false,
        __isSortable: false,
        __isFilterable: false,
    },
    expiresIn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        __isSelectable: false,
        __isSortable: false,
        __isFilterable: false,
        validate: {
            isDate: true,
        },
    },
}, {
    sequelize: sequelize_service_1.SequelizeService,
});
