import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: string | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (typeof err === "string") {
    const is404 = err.toLowerCase().endsWith("not found");
    const statusCode = is404 ? 404 : 400;
    res.status(statusCode).json({ message: err });
  } else {
    res.status(500).json({ message: err.message });
  }
}
