import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  NotEmpty,
  Default,
} from "sequelize-typescript";

interface GuildI {
  id: string;
  isWordleFound: boolean;
  isWordle: boolean;
  isRanking: boolean;
  guessWord: string;
}

@Table({
  tableName: "guilds",
  timestamps: true,
})
export default class Guild extends Model implements GuildI {
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
}
