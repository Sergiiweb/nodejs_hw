import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import mongoose from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public async isIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not valid ID", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
  public isBodyValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { value, error } = validator.validate(req.body);

        if (error) {
          throw new ApiError(error.message, 400);
        }

        req.body = value;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
