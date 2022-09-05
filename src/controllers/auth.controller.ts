import { Request, Response, NextFunction } from "express";

import { AuthService } from "../services/auth.service";

export class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    const tokens = await AuthService.login({
      email: req.body?.fields?.email,
      password: req.body?.fields?.password,
      fingerprint: (<any>req)?.fingerprint?.hash,
      oldRefreshToken: req.cookies?.refreshToken,
    });

    if (!tokens) {
      return res.json(false);
    }

    res.cookie("refreshToken", tokens.refreshToken.value, {
      maxAge: tokens.refreshToken.maxAge,
      httpOnly: true,
    });
    res.json({
      accessToken: tokens.accessToken.value,
      refreshToken: tokens.refreshToken.value,
    });
  };

  static logout = async (req: Request, res: Response, next: NextFunction) => {
    // Await to delete session from db and clear cookies
    res.clearCookie("refreshToken", {
      httpOnly: true,
    });
    res.json(true);
  };
}
