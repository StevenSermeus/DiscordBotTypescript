import { CommandInteraction } from "discord.js";
import GuildM from "../config/models/Guild";
const ranking: any = {
  name: "ranking",
  description: "Set the ranking for the guild",
  async execute(interaction: CommandInteraction, args: any) {
    const action: string = args.get("action").value.toUpperCase();

    if (interaction.guildId === null)
      return interaction.reply(
        "Utiliser cette commande dans un channel de server"
      );
    const guildId = interaction.guildId;

    if (["SET", "REMOVE"].includes(action)) {
      let guild = await GuildM.findByPk(guildId);
      if (!guild) {
        guild = await GuildM.create({
          id: guildId,
          isRanking: false,
        });
      }
      let message = "";
      if (action === "SET") {
        guild.isRanking = true;
        message = "Ranking activée";
      }
      if (action === "REMOVE") {
        guild.isRanking = false;
        message = "Raning désactivée";
      }

      await guild.save();

      return interaction.reply(message);
    }
    return interaction.reply("Mauvaise action choisir entre set et remove");
  },
  options: [
    {
      name: "action",
      description: "What do you want to do with the ranking (set || remove)",
      required: true,
    },
  ],
  choices: [],
};

export default ranking;
