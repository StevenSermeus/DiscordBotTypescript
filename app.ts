import * as dotenv from "dotenv";
import client from "./config/discordClient";
import setUpEvent from "./config/setUpEvent";

dotenv.config();
client.login(process.env["DISCORD_TOKEN"]);

setUpEvent(client);

// Language: typescript
