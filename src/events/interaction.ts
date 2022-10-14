import commands from "../commands";
import { CommandInteraction } from "discord.js";
function interactionHandler(interaction: CommandInteraction) {
  if (!interaction.isCommand()) return;
  const command = commands.find(
    (command) => command.name === interaction.commandName
  );
  if (!command) return;
  command.execute(interaction, interaction.options);
}

export default interactionHandler;
