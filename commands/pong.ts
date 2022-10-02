import { CommandInteraction } from "discord.js";

const pong: any = {
  name: "pong",
  description: "Ping!",
  execute(interaction: CommandInteraction, option: any) {
    interaction.reply("Ping!");
  },
  options: [],
  choices: [],
};

export default pong;
