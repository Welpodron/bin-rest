"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var sequelize_1 = require("sequelize");
var sequelize_service_1 = require("../services/sequelize.service");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var _a;
    _a = User;
    User.__getSpecialFields = function (key) {
        return Object.entries(_a.getAttributes()).filter(function (attribute) {
            var _ = attribute[0], options = attribute[1];
            return options[key];
        });
    };
    return User;
}(sequelize_1.Model));
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
    name: {
        type: sequelize_1.DataTypes.STRING,
        __isSelectable: true,
        __isSortable: true,
        __isFilterable: true,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        __isSelectable: true,
        __isSortable: true,
        __isFilterable: true,
    },
}, {
    sequelize: sequelize_service_1.SequelizeService,
});
