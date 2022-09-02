import { Request, Response, NextFunction } from "express";

import { UserService } from "../services/user.service";

export class UserController {
  static get = async (req: Request, res: Response, next: NextFunction) => {
    const { where, sort, get } = req.query;

    const data = await UserService.get({
      where,
      get,
      sort,
    });

    res.json(data);
  };
}
