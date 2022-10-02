import { CommandInteraction } from "discord.js";
import words from "../config/wordList";

const guess: any = {
  name: "guess",
  description: "Guess a word !",
  execute(interaction: CommandInteraction, args: any) {
    const guess: string = args.get("word").value.toUpperCase();
    if (!guess) return interaction.reply("Please enter a word to guess");
    if (guess.length != 5)
      return interaction.reply("Please enter a 5 letter word");
    if (!words.includes(guess))
      return interaction.reply("Please enter a valid word");
    //get word from db
    let tries: Array<string> = [];
    try {
      tries = this.getTries(interaction);
    } catch (err) {
      interaction.reply("Error getting tries retry later");
    }

    tries.push(guess);
    console.log(tries);
    const wordOfTheDay: string = "HELLO";

    let message: string = "";

    for (const trie of tries) {
      message += this.getLine(trie, wordOfTheDay);
    }

    if (wordOfTheDay === guess) {
      message += "You won !";
      //handle the win for database
    }

    return interaction.reply(message);
  },
  options: [
    {
      name: "word",
      description: "The word to guess",
      required: true,
    },
  ],
  choices: [],
  getTries(interaction: CommandInteraction) {
    //get the guildid from interaction
    const guildId: string = interaction.guildId?.toString() || "";
    if (guildId === "") throw new Error("No guild id found");

    const tries: Array<string> = ["SALUT"];
    return tries;
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
