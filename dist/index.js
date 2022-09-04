"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_service_1 = require("./services/sequelize.service");
const parser_1 = require("./middlewares/parser");
const user_router_1 = require("./routes/user.router");
const auth_router_1 = require("./routes/auth.router");
const app = (0, express_1.default)();
(async () => {
    try {
        await sequelize_service_1.SequelizeService.authenticate();
        console.log("Connection has been established successfully.");
        await sequelize_service_1.SequelizeService.sync();
        console.log("All models were synchronized successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
        // stop application here
    }
    app.use(parser_1.queryParser);
    app.use("/auth", auth_router_1.authRouter);
    app.use("/api", user_router_1.userRouter);
    //   app.get("/", (req: Request, res: Response) => {
    //     const { filter, sort, get } = req.query;
    //     // see: http://localhost:3000/?filter[name][eq]=2&filter[name][lt][nested1][nested2]=5
    //     const _filters: Array<{ field: string; filters: Array<any> }> = [];
    //     if (isObject(filter)) {
    //       const filterableFields = Object.entries(
    //         sequelize.models.User.getAttributes()
    //       ).filter((attribute) => {
    //         const [_, options] = attribute;
    //         return (<any>options)?.__isFilterable;
    //       });
    //       filterableFields.forEach((filterableField) => {
    //         const [fieldName, fieldOptions] = filterableField;
    //         const requestField = (<Record<string, any>>filter)[fieldName];
    //         if (requestField) {
    //           const filters = Object.entries(requestField);
    //           if (filters) {
    //             _filters.push({ field: fieldName, filters });
    //           }
    //         }
    //       });
    //     }
    //     res.send(
    //       User.findAll({
    //         attributes: _get.length ? _get : gettableFields,
    //         where: buildFilter(_filters),
    //         order: _sort,
    //       })
    //     );
    //   });
    app.listen(3000, () => {
        //   console.log("Application started on 3000");
    });
})();
