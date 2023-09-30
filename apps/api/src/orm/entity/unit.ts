import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Unit {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  shortName: string;
}
