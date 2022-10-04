import {
  CommandInteraction,
  GuildDefaultMessageNotifications,
} from "discord.js";
import GuildM from "../config/models/Guild";
const ping: any = {
  name: "togglewordle",
  description: "Enable or disable wordle",
  async execute(interaction: CommandInteraction, args: any) {
    if (interaction.guildId) {
      let guild = await GuildM.findByPk(interaction.guildId);
      if (!guild) {
        guild = await GuildM.create({
          id: interaction.guildId,
          isWordle: true,
        });
      } else {
        guild.isWordle = true;
        guild.save();
      }
      return interaction.reply("You can now play wordle");
    }
    return interaction.reply("Wordle est utilisable seulement dans un server");
  },
  options: [],
  choices: [],
};

export default ping;
