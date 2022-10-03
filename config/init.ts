import { Client, User } from "discord.js";
import { Sequelize } from "sequelize";
import setUpEvent from "./setUpEvent";
import WordleM from "./models/Wordle";
import words from "./wordList";
import GuildM from "./models/Guild";
async function init(client: Client, sequelize: Sequelize) {
  await sequelize.authenticate();
  await sequelize.sync({ force: true, logging: false });
  await setUpEvent(client);
  let newWordle = new WordleM({
    isToday: true,
    word: words[Math.floor(Math.random() * words.length)],
  });
  await newWordle.save();
  await client.login(process.env["BOT_TOKEN"]);
}

export default init;
