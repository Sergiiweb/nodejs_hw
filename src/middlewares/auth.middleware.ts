import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const refreshToken = req.get("Authorization");
      if (!refreshToken) {
        throw new ApiError("No Token", 401);
      }

      const payload = tokenService.checkToken(refreshToken);

      const entity = await tokenRepository.findOne({ refreshToken });
      if (!entity) {
        throw new ApiError("Token not valid", 401);
      }

      req.res.locals.tokenPayload = payload;
      req.res.locals.refreshToken = refreshToken;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
