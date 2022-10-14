import * as dotenv from "dotenv";
import client from "./config/discordClient";
dotenv.config();
import sequelize from "./config/db";
import init from "./config/init";

init(client, sequelize);

// Language: typescript
