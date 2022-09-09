import { Request, Response, NextFunction } from "express";

import { AuthService } from "../services/auth.service";

import { asyncControllerRequest } from "../utils/controllers";

export class AuthController {
  static login = asyncControllerRequest(
    async (req: Request, res: Response, next: NextFunction) => {
      const tokens = await AuthService.login({
        email: req.body?.fields?.email,
        password: req.body?.fields?.password,
        fingerprint: (<any>req)?.fingerprint?.hash,
      });

      if (!tokens) {
        throw new Error("Error was found while trying to create tokens");
      }

      res.cookie("refreshToken", tokens.refreshToken.value, {
        maxAge: tokens.refreshToken.maxAge,
        httpOnly: true,
      });
      res.json({
        accessToken: tokens.accessToken.value,
        refreshToken: tokens.refreshToken.value,
      });
    }
  );

  static logout = asyncControllerRequest(
    async (req: Request, res: Response, next: NextFunction) => {
      // Await to delete session from db and clear cookies
      await AuthService.logout({ refreshToken: req.cookies?.refreshToken });

      res.clearCookie("refreshToken", {
        httpOnly: true,
      });

      res.json(true);
    }
  );

  static refresh = asyncControllerRequest(
    async (req: Request, res: Response, next: NextFunction) => {
      const tokens = await AuthService.refresh({
        fingerprint: (<any>req)?.fingerprint?.hash,
        refreshToken: req.cookies?.refreshToken,
      });

      if (!tokens) {
        throw new Error("Error was found while trying to create tokens");
      }

      res.cookie("refreshToken", tokens.refreshToken.value, {
        maxAge: tokens.refreshToken.maxAge,
        httpOnly: true,
      });
      res.json({
        accessToken: tokens.accessToken.value,
        refreshToken: tokens.refreshToken.value,
      });
    }
  );
}
