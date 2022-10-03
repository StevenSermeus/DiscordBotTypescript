import {
  Table,
  Model,
  Column,
  AllowNull,
  Default,
  ForeignKey,
  PrimaryKey,
} from "sequelize-typescript";
import UserM from "./User";
import GuildM from "./Guild";

interface UserGuildI {
  userId: string;
  guildId: string;
  xp: number;
  messageSent: number;
  timeSpentVoice: number;
  joinedVoiceAt: number;
}

@Table({
  tableName: "UserGuild",
  timestamps: true,
})
export default class UserGuildM extends Model implements UserGuildI {
  @PrimaryKey
  @ForeignKey(() => UserM)
  @Column
  public userId!: string;

  @PrimaryKey
  @ForeignKey(() => GuildM)
  @Column
  public guildId!: string;

  @AllowNull(false)
  @Default(0)
  @Column
  xp!: number;

  @AllowNull(false)
  @Default(0)
  @Column
  messageSent!: number;

  @AllowNull(false)
  @Default(0)
  @Column
  timeSpentVoice!: number;

  @AllowNull(false)
  @Default(0)
  @Column
  joinedVoiceAt!: number;
}
