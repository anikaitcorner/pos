import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Category } from "./category";
import { Business } from "./business";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column("double")
  price: number;

  @Column("double")
  unitCost: number;

  @Column({ type: "double", default: 0 })
  sellingPrice: number;

  @Column("double")
  grossMargin: number;

  @Column("double")
  grossProfit: number;

  @Column({ type: "double", default: 0 })
  discount: number;

  @Column({ default: 0 })
  quantity: number;

  @Column()
  unitType: string;

  @ManyToOne(() => Category, (ct) => ct.products)
  category: Relation<Category>;

  @ManyToOne(() => Business, (b) => b.produts)
  business: Relation<Business>;

  @BeforeInsert()
  beforeInserAction() {
    this.sellingPrice = this.price;
  }
}
