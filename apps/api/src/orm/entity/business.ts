import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";
import { Product } from "./product";

@Entity()
export class Business {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  // Define a one-to-many relationship with User
  @OneToMany(() => User, (user) => user.business)
  users: Relation<User[]>;

  @OneToMany(() => Product, (pr) => pr.business)
  produts: Relation<Product[]>;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
