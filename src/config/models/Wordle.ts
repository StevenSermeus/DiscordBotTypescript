import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  Default,
  AutoIncrement,
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
  @AutoIncrement
  @Column
  public id!: number;

  @Default(false)
  @AllowNull(false)
  @Column
  public isToday!: boolean;

  @AllowNull(false)
  @Default(false)
  @Column
  public word!: string;
}
