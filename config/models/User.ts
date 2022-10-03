import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  Default,
  BelongsToMany,
} from "sequelize-typescript";
import UserGuild from "./UserGuild";
import GuildM from "./Guild";
interface UserI {
  id: string;
  coins: number;
  guilds: Array<GuildM>;
}

@Table({
  tableName: "Users",
  timestamps: true,
})
export default class UserM extends Model implements UserI {
  @PrimaryKey
  @Column
  public id!: string;

  @AllowNull(false)
  @Default(0)
  @Column
  public coins!: number;

  @BelongsToMany(() => GuildM, () => UserGuild)
  public guilds!: GuildM[];
}
