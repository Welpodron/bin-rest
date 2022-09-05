import { CONFIG } from "../config";

import { TokenService } from "../services/token.service";
import { SessionService } from "./session.service";
import { UserService } from "../services/user.service";

import { compare } from "bcrypt";
import { isString } from "../utils/is";

export class AuthService {
  static login = async (config: {
    email: string;
    password: string;
    fingerprint: string;
    oldRefreshToken?: string;
  }) => {
    throw new Error("Nice error, time to implement center error handler");

    if (!isString(config.email) || !isString(config.password)) {
      return false;
    }

    if (!isString(config.fingerprint)) {
      return false;
    }

    const user = (
      await UserService.getAll({
        _ignoreProtection: true,
        _whereRawUnsafe: { email: config.email },
        limit: 1,
      })
    )[0];

    if (!user || !Object.keys(user).length) {
      return false;
    }

    const isPasswordMatching = await compare(config.password, user.password);

    if (!isPasswordMatching) {
      return false;
    }

    const tokens = TokenService.generate({
      userId: user.id,
    });

    // if (config.oldRefreshToken) {
    //   return tokens;
    // }

    const session = await SessionService.create({
      fingerprint: config.fingerprint,
      expiresIn: tokens.refreshToken.expirationDate.toDateString(),
      refreshToken: tokens.refreshToken.value,
      UserId: user.id,
    });

    console.log(session);

    if (!session) {
      return false;
    }

    return tokens;
  };
}
