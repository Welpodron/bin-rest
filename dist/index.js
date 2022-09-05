"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const handler_1 = require("./middlewares/handler");
const sequelize_service_1 = require("./services/sequelize.service");
const parser_1 = require("./middlewares/parser");
const user_router_1 = require("./routes/user.router");
const auth_router_1 = require("./routes/auth.router");
const app = (0, express_1.default)();
app.use(parser_1.queryParser);
app.use((0, cookie_parser_1.default)());
app.use("/auth", auth_router_1.authRouter);
app.use("/api", user_router_1.userRouter);
app.use(handler_1.errorHandler);
(async () => {
    try {
        await sequelize_service_1.SequelizeService.authenticate();
        console.log("Connection has been established successfully.");
        await sequelize_service_1.SequelizeService.sync();
        console.log("All models were synchronized successfully.");
        app.listen(config_1.CONFIG.SERVER_PORT, () => {
            console.log(`Application started on localhost:${config_1.CONFIG.SERVER_PORT}`);
        });
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
        // stop application here
    }
})();
