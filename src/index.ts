import express from "express";
import { Request, Response } from "express";

import { SequelizeService } from "./services/sequelize.service";

import { buildFilter } from "./utils";

import { queryParser } from "./middlewares/parser";

import { isArray, isObject, isString } from "./utils/is";

import { userRouter } from "./routes/user.router";

const app = express();

(async () => {
  try {
    await SequelizeService.authenticate();
    console.log("Connection has been established successfully.");
    await SequelizeService.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    // stop application here
  }

  app.use(queryParser());
  app.use("/api", userRouter);

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
