import client from "../config/discordClient";
import commands from "../commands/";
import { SlashCommandBuilder } from "@discordjs/builders";

async function readyHandeler() {
  client.user?.setPresence({
    activities: [
      {
        name: `Test`,
      },
    ],
  });

  const guilds = client.guilds.cache.map((guild) => guild.name);

  // console.log(commandsList);
  for (let guildName of guilds) {
    const devGuild = client.guilds.cache.find(
      (guild) => guild.name === guildName
    );
    if (devGuild) {
      for (let command of commands) {
        let commandData = new SlashCommandBuilder()
          .setName(command.name)
          .setDescription(command.description);
        if (command.options.length > 0) {
          for (let option of command.options) {
            commandData.addStringOption(option);
          }
        }
        if (command.choices.length > 0) {
          for (let choice of command.choices) {
            commandData.addStringOption(choice);
          }
        }

        devGuild.commands.create(commandData);
      }
    }
  }

  client.user?.setStatus("online");
  console.log(`Logged in as ${client.user?.username}!`);
}

export default readyHandeler;
