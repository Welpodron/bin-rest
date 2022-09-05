import { CONFIG } from "../config";

import jwt from "jsonwebtoken";
import ms from "ms";

export class TokenService {
  static generate = (payload: any) => {
    const accessTokenMaxAgeMs = ms(CONFIG.JWT_ACCESS_EXPIRES_IN);
    const refreshTokenMaxAgeMs = ms(CONFIG.JWT_REFRESH_EXPIRES_IN);

    const accessTokenExpirationDate = new Date(
      Date.now() + accessTokenMaxAgeMs
    );
    const refreshTokenExpirationDate = new Date(
      Date.now() + refreshTokenMaxAgeMs
    );

    const accessToken = jwt.sign(payload, CONFIG.JWT_ACCESS_SECRET, {
      expiresIn: accessTokenMaxAgeMs,
    });
    const refreshToken = jwt.sign(payload, CONFIG.JWT_REFRESH_SECRET, {
      expiresIn: refreshTokenMaxAgeMs,
    });

    return {
      accessToken: {
        value: accessToken,
        maxAge: accessTokenMaxAgeMs,
        expirationDate: accessTokenExpirationDate,
      },
      refreshToken: {
        value: refreshToken,
        maxAge: refreshTokenMaxAgeMs,
        expirationDate: refreshTokenExpirationDate,
      },
    };
  };

  static verify = (token: any) => {};
}
