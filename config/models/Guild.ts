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
  streak: number;
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
  @Default(false)
  @NotEmpty
  @Column
  public isWordleFound!: boolean;

  @AllowNull(false)
  @Default(false)
  @NotEmpty
  @Column
  public isWordle!: boolean;

  @AllowNull(false)
  @Default(false)
  @NotEmpty
  @Column
  public isRanking!: boolean;

  @Default("")
  @AllowNull(false)
  @Column
  public guessWord!: string;

  @Default(0)
  @AllowNull(false)
  @Column
  public streak!: number;

  @BelongsToMany(() => UserM, () => UserGuild)
  public users!: UserM[];

  @AllowNull(false)
  @Default("")
  @Column
  notificationChannel!: string;
}
