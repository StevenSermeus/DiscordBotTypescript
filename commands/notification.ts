import { CommandInteraction } from "discord.js";
import GuildM from "../config/models/Guild";
const notification: any = {
  name: "notification",
  description: "Set the channel for all the notification of the bot",
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
          notificationChannel: interaction.channelId,
        });
      }
      let message = "";
      if (action === "SET") {
        guild.notificationChannel = interaction.channelId;
        message = "Notification activée";
      }
      if (action === "REMOVE") {
        guild.notificationChannel = "";
        message = "Notification désactivée";
      }

      await guild.save();

      return interaction.reply(message);
    }
    return interaction.reply("Mauvaise action choisir entre set et remove");
  },
  options: [
    {
      name: "action",
      description:
        "What do you want to do with the notification channel (set || remove)",
      required: true,
    },
  ],
  choices: [],
};

export default notification;
