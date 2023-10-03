import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { userService } from "../services/user.service";
import { IUser } from "../types/user.type";
import { UserValidator } from "../validators/user.validator";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.res.locals;

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any>> {
    try {
      const user = await userService.createUser();

      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not valid ID", 400);
      }

      const user = await User.findById(id);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      const { deletedCount } = await User.deleteOne({ _id: id });
      if (!deletedCount) {
        throw new ApiError("User not found", 404);
      }

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not valid ID", 400);
      }

      const { value, error } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }

      const user = await User.findByIdAndUpdate(id, value, {
        returnDocument: "after",
      });

      if (!user) {
        throw new ApiError("User not found", 404);
      }

      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
