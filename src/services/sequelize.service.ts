import { Sequelize } from "sequelize";

export const SequelizeService = new Sequelize({
  dialect: "sqlite",
  storage: "db/database.sqlite",
});
