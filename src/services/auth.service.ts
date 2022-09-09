import { CONFIG } from "../config";

import { TokenService } from "../services/token.service";
import { SessionService } from "./session.service";
import { UserService } from "../services/user.service";

import { compare } from "bcrypt";
import { isString } from "../utils/is";
import { JwtPayload } from "jsonwebtoken";

export class AuthService {
  static login = async (config: {
    email: string;
    password: string;
    fingerprint: string;
  }) => {
    if (!isString(config.email) || !isString(config.password)) {
      throw new Error("Missing email and password");
    }

    if (!isString(config.fingerprint)) {
      throw new Error("Missing device fingerprint");
    }

    const user = (
      await UserService.getAll({
        _ignoreProtection: true,
        _whereRawUnsafe: { email: config.email },
        limit: 1,
      })
    )[0];

    if (!user || !Object.keys(user).length) {
      throw new Error("User credentials was invalid or user was not found");
    }

    const isPasswordMatching = await compare(config.password, user.password);

    if (!isPasswordMatching) {
      throw new Error("User credentials was invalid or user was not found");
    }

    const tokens = TokenService.generate({
      userId: user.id,
    });

    const session = await SessionService.create({
      fields: {
        fingerprint: config.fingerprint,
        expiresIn: tokens.refreshToken.expirationDate.toDateString(),
        refreshToken: tokens.refreshToken.value,
        UserId: user.id,
      },
    });

    // WARNING MAX SESSIONS NEEDS TO BE IMPLEMENTED
    /*
    if (sessionCurrrentAmount > MAX_AMOUNT) { update some session DONT CREATE NEW ONE }
    */

    // So the problem here is expired sessions stored inside session db

    if (!session) {
      throw new Error("Error was thrown while trying to create session");
    }

    return tokens;
  };
  static logout = async (config: { refreshToken: string }) => {
    if (!isString(config.refreshToken)) {
      // not throw error for now just return
      return;
    }

    if (!TokenService.verify(config.refreshToken, CONFIG.JWT_REFRESH_SECRET)) {
      // throw new Error("Validation");
      // not throw error for now just delete it
    }

    return await SessionService.delete({
      _whereRawUnsafe: { refreshToken: config.refreshToken },
    });
  };
  static refresh = async (config: {
    refreshToken: string;
    fingerprint: string;
  }) => {
    if (!isString(config.refreshToken)) {
      throw new Error("Missing refreshToken");
    }

    const data = TokenService.verify(
      config.refreshToken,
      CONFIG.JWT_REFRESH_SECRET
    );

    if (!data) {
      throw new Error("Refreshtoken is invalid or was not found");
    }

    let session = (
      await SessionService.getAll({
        _ignoreProtection: true,
        _whereRawUnsafe: { refreshToken: config.refreshToken },
        limit: 1,
      })
    )[0];

    if (!session || !Object.keys(session).length) {
      throw new Error("Refreshtoken is invalid or was not found");
    }

    // So the problem here is expired sessions stored inside session db

    if (session.fingerprint !== config.fingerprint) {
      throw new Error(
        "Called refresh from new device. You must to login and create new session instead of updating it here!"
      );
    }

    const tokens = TokenService.generate({
      userId: (data as JwtPayload).userId,
    });

    await SessionService.update({
      fields: {
        refreshToken: tokens.refreshToken.value,
        expiresIn: tokens.refreshToken.expirationDate.toDateString(),
      },
      _whereRawUnsafe: {
        fingerprint: config.fingerprint,
        refreshToken: config.refreshToken,
        UserId: (data as JwtPayload).userId,
      },
    });

    // So the problem here is expired sessions stored inside session db

    return tokens;
  };
}
