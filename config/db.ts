import { Sequelize } from "sequelize";

//connect to the database in postgres

const sequelize = new Sequelize(
  `postgres://${process.env["DATABASE_USER"]}:${process.env["DATABASE_PASSWORD"]}@${process.env["DATABASE_HOST"]}:5432/discord`
);

export default sequelize;
