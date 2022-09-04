import { Request, Response, NextFunction } from "express";

import { UserService } from "../services/user.service";

export class UserController {
  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { where, sort, get } = req.query;

    const data = await UserService.getAll({
      where,
      get,
      sort,
    });

    res.json(data);
  };

  static create = async (req: Request, res: Response, next: NextFunction) => {
    const data = await UserService.create(req.body?.fields);

    res.json(req.body);
  };
}
