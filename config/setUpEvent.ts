import { Client, CommandInteraction, Message } from "discord.js";
import readyHandeler from "../events/ready";
import interactionHandler from "../events/interaction";
import messageHandler from "../events/message";

function setUpEvent(client: Client) {
  client.on("ready", readyHandeler);
  client.on("interactionCreate", (interaction: any) => {
    interactionHandler(interaction);
  });
  client.on("messageCreate", (message: Message) => {
    messageHandler(message);
  });
}

export default setUpEvent;
