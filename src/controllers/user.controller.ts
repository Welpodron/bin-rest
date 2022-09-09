import { Request, Response, NextFunction } from "express";

import { UserService } from "../services/user.service";

import { asyncControllerRequest } from "../utils/controllers";

export class UserController {
  static getAll = asyncControllerRequest(
    async (req: Request, res: Response, next: NextFunction) => {
      const { where, sort, get } = req.query;

      const data = await UserService.getAll({
        where,
        get,
        sort,
      });

      res.json(data);
    }
  );

  static create = asyncControllerRequest(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await UserService.create(req.body?.fields);

      res.json(req.body);
    }
  );
}
