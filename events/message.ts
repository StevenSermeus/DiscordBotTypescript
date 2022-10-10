import { Message } from "discord.js";
import GuildM from "../config/models/Guild";
import UserGuildM from "../config/models/UserGuild";
import client from "../config/discordClient";
import UserM from "../config/models/User";
import { REPLServer } from "repl";
async function messageHandler(message: Message) {
  if (message.author.bot) return;

  if (message.channel.type !== 0) return;

  if (!message.guildId) return;

  easterEgg(message);

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
      if (channel !== undefined && channel.isTextBased()) {
        channel.send(
          `Félicitation <@${message.author.id}> tu as atteint le niveau ${userDB.xp}`
        );
      }
    }
  }
  await userDB.save();
}

async function easterEgg(message: Message) {
  const content = message.content.toLowerCase();

  if (content == "quoi" || content == "quoi ?" || content == "quoi?")
    return message.reply("feur");

  if (content.includes("odoo")) return message.reply("Non le démon");

  if (content.includes("discord")) return message.react("🤖");

  if (content.includes("chacha")) return message.reply("Mams");

  if (content.includes("boubou")) {
    setTimeout(
      () =>
        message.reply(
          `J'avais du café pas chaud désolé du retard. Oh c'est que 5 minutes en plus !`
        ),
      5 * 60 * 1000
    );
  }

  if (content == "while(true)") {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        message.channel.send("BIP BOU BIP ....");
      }, i * 200);
    }
    return message.reply("Et le clean code merde");
  }

  if (content.includes("bg"))
    return (await message.reply("Le prof de BDD quel bg :3")).react("😍");

  if (content.includes("joris")) return message.reply("if(estCon == true)");

  if (content.includes("steven"))
    return message.reply("Docker ? Git ?, ... Le débugger a votre service");
}
export default messageHandler;
