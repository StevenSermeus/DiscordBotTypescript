import { col } from "sequelize";
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  NotEmpty,
  Default,
  BelongsToMany,
} from "sequelize-typescript";
import { Col } from "sequelize/types/utils";

import UserM from "./User";
import UserGuild from "./UserGuild";

interface GuildI {
  id: string;
  isWordleFound: boolean;
  isWordle: boolean;
  isRanking: boolean;
  guessWord: string;
  users: Array<UserM>;
  notificationChannel: string;
}

@Table({
  tableName: "Guilds",
  timestamps: true,
})
export default class GuildM extends Model implements GuildI {
  @PrimaryKey
  @Column
  public id!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  public isWordleFound!: boolean;

  @AllowNull(false)
  @NotEmpty
  @Column
  public isWordle!: boolean;

  @AllowNull(false)
  @NotEmpty
  @Column
  public isRanking!: boolean;

  @Default("")
  @AllowNull(false)
  @Column
  public guessWord!: string;

  @BelongsToMany(() => UserM, () => UserGuild)
  public users!: UserM[];

  @AllowNull(true)
  @Default(null)
  @Column
  notificationChannel!: string;
}
