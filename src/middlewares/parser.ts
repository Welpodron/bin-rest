import { Request, Response, NextFunction } from "express";
import { convertToObject } from "../utils/converter";

export const queryParser = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.query = convertToObject(req.query);
    next();
  };
};
