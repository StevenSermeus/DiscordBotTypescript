import { Message } from "discord.js";
import GuildM from "../config/models/Guild";
import UserGuildM from "../config/models/UserGuild";
import client from "../config/discordClient";
import UserM from "../config/models/User";
async function messageHandler(message: Message) {
  if (message.author.bot) return;

  if (message.channel.type !== 0) return;

  if (!message.guildId) return;

  if (message.content.includes("odoo")) message.reply("Non le démon");

  if (message.content.includes("discord")) message.react("🤖");

  if (message.content.toLowerCase().includes("bg"))
    (await message.reply("Benjamin Georges ?")).react("😍");

  const guildDB = await GuildM.findByPk(message.guildId);
  if (!guildDB) return;
  if (!guildDB.isRanking) return;

  await UserM.findOrCreate({
    where: { id: message.author.id },
    defaults: { id: message.author.id, username: message.author.username },
  });

  let [userDB, alredyExit] = await UserGuildM.findOrCreate({
    where: {
      userId: message.author.id,
      guildId: message.guildId,
    },
    defaults: {
      userId: message.author.id,
      guildId: message.guildId,
      messageSent: 0,
      xp: 0,
    },
  });

  await userDB.increment("xp", { by: 3 });

  const levelCap = 5 * (userDB.level ^ 2) + 50 * userDB.level + 100;

  console.log(levelCap);
  console.log(userDB.messageSent);
  if (userDB.xp >= levelCap) {
    await userDB.increment("level");
    await userDB.update({ xp: 0 });
    console.log(guildDB.notificationChannel !== "");
    console.log(guildDB.notificationChannel);
    if (guildDB.notificationChannel === "") {
      message.channel.send(
        `Félicitation <@${message.author.id}> tu as atteint le niveau ${userDB.xp}`
      );
    } else {
      let channel = client.channels.cache.get(guildDB.notificationChannel);
      if (channel?.isTextBased()) {
        channel.send(
          `Félicitation <@${message.author.id}> tu as atteint le niveau ${userDB.xp}`
        );
      }
    }
  }
  await userDB.save();
}

export default messageHandler;
