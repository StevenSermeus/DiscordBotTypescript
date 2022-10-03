import * as dotenv from "dotenv";
import client from "./config/discordClient";
dotenv.config();
import sequelize from "./config/db";
import init from "./config/init";
import WordleM from "./config/models/Wordle";
const CronJob = require("cron").CronJob;
const words = require("./word.json");
import GuildM from "./config/models/Guild";

const job = new CronJob(
  "0 8 * * *",
  async function () {
    try {
      let wordle = await WordleM.findOne({ where: { isToday: true } });
      if (wordle) {
        wordle.isToday = false;
        await wordle.save();
      }
      let newWordle = await new WordleM({
        isToday: true,
        word: words[Math.floor(Math.random() * words.length)],
      });
      await newWordle.save();

      let guilds = await GuildM.findAll({
        where: {
          isWordleFound: false,
          isWordle: true,
        },
      });
      guilds.forEach(async (guild) => {
        if (guild) {
          if (guild.isWordleFound) {
            guild.isWordleFound = false;
          } else {
            guild.streak = 0;
          }
        }
        await guild.save();
      });
    } catch (err) {
      console.error(err);
    }
  },
  true,
  "Europe/Paris"
);

job.start();

init(client, sequelize);

// Language: typescript
