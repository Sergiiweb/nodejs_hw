import { NextFunction, Request, Response, Router } from "express";
import mongoose from "mongoose";

import { userController } from "../controllers/user.controller";
import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("", userController.getAll);

// Endpoint for creating user
router.post("", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { value, error } = UserValidator.create.validate(req.body);
    if (error) {
      throw new ApiError(error.message, 400);
    }

    const createdUser = await User.create(value);
    res.status(201).json(createdUser);
  } catch (e) {
    next(e);
  }
});

router.get(":id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!mongoose.isObjectIdOrHexString(id)) {
      throw new ApiError("Not valid ID", 400);
    }

    const user = await User.findById(id);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.delete(
  ":id",
  async (req: Request, res: Response, next: NextFunction) => {
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
  },
);

router.put(":id", async (req: Request, res: Response, next: NextFunction) => {
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
});

export const userRouter = router;
