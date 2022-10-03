import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  Default,
  BelongsToMany,
} from "sequelize-typescript";

interface WordleI {
  id: number;
  isToday: boolean;
  word: string;
}

@Table({
  tableName: "Wordle",
  timestamps: true,
})
export default class WordleM extends Model implements WordleI {
  @PrimaryKey
  @Column
  public id!: number;

  @AllowNull(false)
  @Default(false)
  @Column
  public isToday!: boolean;

  @AllowNull(false)
  @Default(false)
  @Column
  public word!: string;
}
