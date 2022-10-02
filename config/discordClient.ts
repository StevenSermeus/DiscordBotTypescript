import { Client, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

function createClient() {
  const client = new Client({
    intents: [
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
    ],
  });
  return client;
}

const client = createClient();

export default client;
