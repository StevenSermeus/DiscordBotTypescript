import { Client, User } from "discord.js";
import { Sequelize } from "sequelize";
import setUpEvent from "./setUpEvent";
import WordleM from "./models/Wordle";
import words from "./wordList";
import GuildM from "./models/Guild";
const cron = require("node-cron");
import client from "./discordClient";

function startJob() {
  cron.schedule(
    "00 8 * * *",
    async function () {
      let wordle = await WordleM.findOne({ where: { isToday: true } });
      if (wordle) {
        wordle.isToday = false;
        await wordle.save();
      }

      let newWordle = new WordleM({
        isToday: true,
        word: words[Math.floor(Math.random() * words.length)],
      });
      await newWordle.save();

      let guilds = await GuildM.findAll({ where: { isWordle: true } });
      if (!guilds) return;
      for (let guild of guilds) {
        guild.guessWord = "";
        if (guild.isWordleFound) {
          guild.isWordleFound = false;
          guild.streak += 1;
          await guild.save();
        } else {
          guild.streak = 0;
          await guild.save();
        }
        //if guild notificationChannel != null send message
        if (guild.notificationChannel != "") {
          let channel = client.channels.cache.get(guild.notificationChannel);
          if (channel?.isTextBased()) {
            channel.send(
              `There is a new wordle! You have ${guild.streak} streaks!`
            );
          }
        }
      }
    },
    {
      scheduled: true,
      timezone: "Europe/Paris",
    }
  );
}
async function init(client: Client, sequelize: Sequelize) {
  await sequelize.authenticate();
  await sequelize.sync({ force: true, logging: false });
  await setUpEvent(client);

  let newWordle = new WordleM({
    isToday: true,
    word: words[Math.floor(Math.random() * words.length)],
  });
  await startJob();
  await newWordle.save();
  await client.login(process.env["BOT_TOKEN"]);
}

export default init;
