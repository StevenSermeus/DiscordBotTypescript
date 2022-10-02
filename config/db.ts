import { Sequelize } from "sequelize";

//connect to the database in postgres

const sequelize = new Sequelize(
  `postgres://${process.env["DATABASE_USER"]}:${process.env["DATABASE_PASSWORD"]}@${process.env["DATABASE_HOST"]}:5432/discord`
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    sequelize.sync({ force: true, alter: true, logging: console.log });
    try {
    } catch (e) {
      console.log(e);
    }
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
