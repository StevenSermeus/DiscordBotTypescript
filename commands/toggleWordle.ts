import { CommandInteraction } from "discord.js";
import GuildM from "../config/models/Guild";
const ping: any = {
  name: "togglewordle",
  description: "Enable or disable wordle",
  async execute(interaction: CommandInteraction, args: any) {},
  options: [],
  choices: [],
};

export default ping;
