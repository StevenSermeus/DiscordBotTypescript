import { CommandInteraction, EmbedBuilder } from "discord.js";
import UserGuildM from "../config/models/UserGuild";
import UserM from "../config/models/User";
const profil: any = {
  name: "profil",
  description: "Shows your profile !",
  async execute(interaction: CommandInteraction, args: any) {
    const guildId = interaction.guildId;
    if (!guildId)
      return interaction.reply("You can't use this command in DMs !");
    const userId = interaction.user.id;
    const userStats = await UserGuildM.findOne({
      where: {
        userId,
        guildId,
      },
    });
    if (!userStats) return interaction.reply("You don't have any stats !");
    const userData = await UserM.findByPk(userId);
    if (!userData) return interaction.reply("You don't have any stats !");
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username}'s profile`)
      .addFields(
        { name: "Level", value: `${userStats.level}`, inline: true },
        { name: "Xp", value: `${userStats.xp}`, inline: true },
        // { name: "\u200B", value: "\u200B" },
        {
          name: "Xp needed for next level",
          value: `${5 * (userStats.level ^ 2) + 50 * userStats.level + 100}`,
        },
        {
          name: "Message send",
          value: `${userStats.messageSent}`,
          inline: true,
        },
        {
          name: "Time spent in voice channel",
          value: `${Math.round(userStats.timeSpentVoice / 60000)} minutes`,
          inline: true,
        },
        { name: "Coins", value: `${userData.coins} coins` }
      );
    interaction.reply({ embeds: [embed] });
  },
  options: [],
  choices: [],
};

export default profil;
