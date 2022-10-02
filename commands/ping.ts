import { CommandInteraction } from "discord.js";

const ping: any = {
  name: "ping",
  description: "Pong!",
  execute(interaction: CommandInteraction, args: any) {
    interaction.reply("Pong!");
  },
  options: [],
  choices: [],
};

export default ping;
