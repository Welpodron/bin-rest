import * as dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
  SERVER_PORT: parseInt(<string>process.env.SERVER_PORT) || 5000,
  MAX_SESSIONS: parseInt(<string>process.env.MAX_SESSIONS) || 5,
  BCRYPT_HASH_ROUNDS: parseInt(<string>process.env.BCRYPT_HASH_ROUNDS) || 10,
  JWT_ACCESS_SECRET: <string>process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: <string>process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_SECRET: <string>process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: <string>process.env.JWT_REFRESH_EXPIRES_IN,
};
