import { Request, Response, NextFunction } from "express";

export const asyncControllerRequest =
  (func: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
  };
