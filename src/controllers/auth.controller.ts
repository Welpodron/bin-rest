import { Request, Response, NextFunction } from "express";

import { UserService } from "../services/user.service";

export class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.getOne({
      where: { email: req.body.fields?.email },
    });
    res.json(user);
  };

  static logout = async () => {};
}
