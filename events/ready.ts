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
          for (let optionData of command.options) {
            commandData.addStringOption((option) =>
              option
                .setName(optionData.name)
                .setDescription(optionData.description)
                .setRequired(optionData.required)
            );
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
