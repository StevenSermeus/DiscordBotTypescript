import {
  CommandInteraction,
  GuildDefaultMessageNotifications,
} from "discord.js";
import GuildM from "../config/models/Guild";
import WordleM from "../config/models/Wordle";
import words from "../config/wordList";

const guess: any = {
  name: "guess",
  description: "Guess a word !",
  async execute(interaction: CommandInteraction, args: any) {
    const guess: string = args.get("word").value.toUpperCase();
    if (interaction.guildId == null)
      return interaction.reply("No guild id found");
  },
  options: [
    {
      name: "word",
      description: "The word to guess",
      required: true,
    },
  ],
  choices: [],
  async getTries(interaction: CommandInteraction) {
    //get the guildid from interaction

    if (interaction.guildId) {
      const guild = await GuildM.findByPk(interaction.guildId);
      if (!guild) {
        let newGuild = await new GuildM({
          id: interaction.guildId,
        });
        await newGuild.save();
        throw new Error("Wordle isn't set");
      }
      if (guild == null || !guild.isWordle) {
        throw new Error("Wordle is not enabled");
      }
      const tries = guild.guessWord.split(",");
      return { tries, guild };
    }
    throw new Error("GuildId is not defined");
  },
  getLine(word: string, solution: string) {
    let line: string = "";
    let tempWord: string = word;
    for (let i = 0; i < word.length; i++) {
      if (word[i] == solution[i]) {
        tempWord = tempWord.substring(0, i) + " " + tempWord.substring(i + 1);
      }
    }
    for (let i = 0; i < word.length; i++) {
      if (tempWord[i] === " ") {
        line += "🟩";
      } else if (solution.includes(tempWord[i])) {
        line += "🟨";
        tempWord = tempWord.substring(0, i) + " " + tempWord.substring(i + 1);
      } else {
        line += "⬜";
      }
    }

    return `${line} : ${word}\n`;
  },
};

export default guess;
