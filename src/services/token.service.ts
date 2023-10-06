import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ITokenPayload, ITokensPair } from "../types/token.types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokensPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "30s",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public checkToken(token: string): ITokenPayload {
    return jwt.verify(token, configs.JWT_REFRESH_SECRET) as ITokenPayload;
  }
}

export const tokenService = new TokenService();
