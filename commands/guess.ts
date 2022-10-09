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
    /*verif of input*/
    if (interaction.guildId === null)
      return interaction.reply(
        "Utiliser cette commande dans un channel de server"
      );
    try {
      const data = await this.getTries(interaction);
      let guild = data.guild;
      let tries = data.tries;

      if (guess.length != 5)
        return interaction.reply(
          "Ce wordle fonctionne avec un mot de 5 lettres"
        );

      const wordleOfTheDay: WordleM | null = await WordleM.findOne({
        where: {
          isToday: true,
        },
      });

      if (wordleOfTheDay == null)
        return interaction.reply("Il n'y a pas de mot du jour pour le moment");
      if (!guild) return interaction.reply("Le server n'a pas activé wordle !");

      if (guild.isWordleFound)
        return interaction.reply(
          `Le mot à déjà été trouvé: \n ${this.getMessage(
            tries,
            wordleOfTheDay.word
          )}`
        );

      if (tries.length == 6)
        return interaction.reply(
          `Il n'y a plus d'essai disponible, le mot était${
            wordleOfTheDay.word
          }:\n${this.getMessage(tries, wordleOfTheDay.word)}`
        );

      if (!words.includes(guess))
        return interaction.reply("Le mot n'est pas dans la list !");

      tries.push(guess);
      tries = tries.filter((x: string) => x != "");

      if (guess === wordleOfTheDay.word) {
        guild.isWordleFound = true;
        guild.guessWord = tries.join(",");
        await guild.save();
        return interaction.reply(
          "Wow tu as trouvé GG ! \n" +
            this.getMessage(tries, wordleOfTheDay.word)
        );
      }
      guild.guessWord = tries.join(",");
      await guild.save();
      return interaction.reply(
        `Le mot n'a pas été trouvé:\n${this.getMessage(
          tries,
          wordleOfTheDay.word
        )}`
      );
    } catch (error: any) {
      return interaction.reply(error.message);
    }
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
        return { tries: [], guild: null };
      }
      const tries = guild.guessWord.split(",");
      return { tries: tries, guild: guild };
    }
    throw new Error("GuildId is not defined");
  },
  getLine(word: string, solution: string) {
    let line: string = "";
    let tempWord: string = word;
    let tempSolution: string = solution;

    for (let i = 0; i < solution.length; i++) {
      if (solution[i] === tempWord[i]) {
        tempWord = tempWord.slice(0, i) + " " + tempWord.slice(i + 1);
        tempSolution =
          tempSolution.slice(0, i) + " " + tempSolution.slice(i + 1);
      }
    }
    for (let i = 0; i < solution.length; i++) {
      if (tempWord[i] === "") {
        line += "🟩";
      } else {
        if (tempSolution.includes(tempWord[i])) {
          line += "🟨";
          tempSolution =
            tempSolution.slice(0, tempSolution.indexOf(tempWord[i])) +
            " " +
            tempSolution.slice(tempSolution.indexOf(tempWord[i]) + 1);
        } else {
          line += "⬜";
        }
      }
    }
    return `${line} : ${word}\n`;
  },
  getMessage(tries: Array<string>, wordleOfTheDay: string) {
    let message = "";
    for (let trie of tries) {
      message += this.getLine(trie, wordleOfTheDay);
    }
    return message;
  },
};

export default guess;
