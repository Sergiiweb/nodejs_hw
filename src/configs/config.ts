import { config } from "dotenv";

config();

export const configs = {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT || 5001,
  SECRET_SALT: process.env.SECRET_SALT || 10,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,
};
