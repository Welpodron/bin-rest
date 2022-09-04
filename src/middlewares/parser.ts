import { Request, Response, NextFunction } from "express";

import { convertToObject } from "../utils/converter";

export const queryParser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.query = convertToObject(req.query);
  next();
};

import formidable from "formidable";

export const formParser = (req: Request, res: Response, next: NextFunction) => {
  const form = formidable();

  form.parse(req, (error, fields, files) => {
    console.error(error);

    req.body = { fields, files };

    next();
  });
};
