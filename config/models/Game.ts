import { StringifyOptions } from "querystring";
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  NotEmpty,
  Default,
  BelongsToMany,
  ForeignKey,
  AutoIncrement,
} from "sequelize-typescript";

import UserM from "./User";
import GuildM from "./Guild";

interface GameI {
  id: number;
  guildId: string;
  player1: string;
  player2: string;
  type: string;
  turn: boolean;
  isFinished: boolean;
  bet: number;
}

@Table({
  tableName: "Games",
  timestamps: true,
})
export default class GameM extends Model implements GameI {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @ForeignKey(() => UserM)
  @Column
  public player1!: string;

  @ForeignKey(() => UserM)
  @Column
  public player2!: string;

  @ForeignKey(() => GuildM)
  @Column
  public guildId!: string;

  @Column
  public type!: string;

  @AllowNull(false)
  @Default(0)
  @Column
  public turn!: boolean;

  @AllowNull(false)
  @Default(false)
  @Column
  public isFinished!: boolean;

  @AllowNull(true)
  @Default(null)
  @Column
  public bet!: number;
}
