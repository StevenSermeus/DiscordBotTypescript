import { Client } from "discord.js";
import { Sequelize } from "sequelize";
import setUpEvent from "./setUpEvent";

async function init(client: Client, sequelize: Sequelize) {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
  await setUpEvent(client);
  await client.login(process.env["DISCORD_TOKEN"]);
}

export default init;
