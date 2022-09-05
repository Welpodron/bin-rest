import { Response, Request, NextFunction } from "express";

import httpStatus from "http-status";

import { APIError } from "../services/error.service";

export const errorHandler = (
  err: APIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  // use logger here probably ???

  const message = err.message || httpStatus[httpStatus.INTERNAL_SERVER_ERROR];

  console.error(err);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
