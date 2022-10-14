import { Client, CommandInteraction, Message, VoiceState } from "discord.js";
import readyHandeler from "../events/ready";
import interactionHandler from "../events/interaction";
import messageHandler from "../events/message";
import voiceStatusUpdateHandler from "../events/voiceState";
function setUpEvent(client: Client) {
  client.on("ready", readyHandeler);
  client.on("interactionCreate", (interaction: any) => {
    interactionHandler(interaction);
  });
  client.on("messageCreate", (message: Message) => {
    messageHandler(message);
  });
  client.on(
    "voiceStateUpdate",
    (oldState: VoiceState, newState: VoiceState) => {
      voiceStatusUpdateHandler(oldState, newState);
    }
  );
}

export default setUpEvent;
