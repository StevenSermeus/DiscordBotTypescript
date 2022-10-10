import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: "discord",
  dialect: "postgres",
  username: process.env["DATABASE_USER"],
  password: process.env["DATABASE_PASSWORD"],
  host: process.env["DATABASE_HOST"],
  models: [__dirname + "/models"],
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
