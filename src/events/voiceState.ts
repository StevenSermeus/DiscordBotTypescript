import { VoiceState } from "discord.js";
import GuildM from "../config/models/Guild";
import UserGuildM from "../config/models/UserGuild";
import UserM from "../config/models/User";
import client from "../config/discordClient";
async function voiceStatusUpdateHandler(
  oldState: VoiceState,
  newState: VoiceState
) {
  if (oldState.channelId === newState.channelId) return;
  if (oldState.channelId === null) {
    console.log("join");
    const guildDB = await getGuildFromDatabase(newState.guild.id);
    if (!guildDB) return;
    await UserM.findOrCreate({
      where: { id: newState.id },
      defaults: { id: newState.id },
    });

    const [profil] = await UserGuildM.findOrCreate({
      where: {
        userId: newState.id,
        guildId: newState.guild.id,
      },
      defaults: {
        userId: newState.id,
        guildId: newState.guild.id,
      },
    });
    profil.joinedVoiceAt = Date.now();
    await profil.save();
  } else if (newState.channelId === null) {
    const guildDB = await getGuildFromDatabase(oldState.guild.id);
    if (!guildDB) return;
    await UserM.findOrCreate({
      where: { id: oldState.id },
      defaults: { id: oldState.id },
    });
    const [profil] = await UserGuildM.findOrCreate({
      where: {
        userId: newState.id,
        guildId: newState.guild.id,
      },
      defaults: {
        userId: newState.id,
        guildId: newState.guild.id,
      },
    });
    if (profil.joinedVoiceAt === null) return;
    const time = Date.now() - profil.joinedVoiceAt;
    profil.joinedVoiceAt = 0;
    profil.xp += Math.round((time / 60000) * 2.5);
    await profil.save();
    await profil.increment("timeSpentVoice", { by: time });
    let levelCap = 5 * (profil.level ^ 2) + 50 * profil.level + 100;
    while (profil.xp >= levelCap) {
      profil.level++;
      profil.xp = profil.xp - levelCap;

      if (guildDB.notificationChannel !== "") {
        let channel = client.channels.cache.get(guildDB.notificationChannel);
        if (channel?.isTextBased()) {
          channel.send(
            `Félicitation <@${oldState.id}> tu as atteint le niveau ${profil.level}`
          );
        }
      }
      levelCap = 5 * (profil.level ^ 2) + 50 * profil.level + 100;
    }
    await profil.save();
  } else {
    return; //switch
  }
}

async function getGuildFromDatabase(guildId: string): Promise<GuildM | null> {
  const guildDB = await GuildM.findByPk(guildId);
  if (!guildDB) return null;
  if (!guildDB.isRanking) return null;
  return guildDB;
}

export default voiceStatusUpdateHandler;
