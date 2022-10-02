import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: "discord",
  dialect: "postgres",
  username: process.env["DATABASE_USER"],
  password: process.env["DATABASE_PASSWORD"],
  host: process.env["DATABASE_HOST"],
  models: [__dirname + "/models"], // or [Player, Team],
});

export default sequelize;
