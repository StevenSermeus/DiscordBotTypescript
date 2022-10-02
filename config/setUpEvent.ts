import { Client, CommandInteraction } from "discord.js";
import readyHandeler from "../events/ready";
import interactionHandler from "../events/interaction";

function setUpEvent(client: Client) {
  client.on("ready", readyHandeler);
  client.on("interactionCreate", (interaction: any) => {
    interactionHandler(interaction);
  });
}

export default setUpEvent;
