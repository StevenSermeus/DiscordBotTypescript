import * as dotenv from "dotenv";
import client from "./config/discordClient";
import setUpEvent from "./config/setUpEvent";
dotenv.config();
import sequelize from "./config/db";

sequelize.sync();

client.login(process.env["DISCORD_TOKEN"]);

setUpEvent(client);

// Language: typescript
