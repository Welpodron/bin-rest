import httpStatus from "http-status";

export class APIError extends Error {
  statusCode: number;

  constructor({
    statusCode = httpStatus.INTERNAL_SERVER_ERROR,
    message,
  }: {
    statusCode: number;
    message: any;
  }) {
    super(message);

    this.statusCode = statusCode;
  }
}
