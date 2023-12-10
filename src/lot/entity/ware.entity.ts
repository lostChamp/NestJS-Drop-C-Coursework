import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "../../category/entity/category.entity";
import { ManufacturerEntity } from "../../manufacturer/entity/manufacturer.entity";
import { OrderEntity } from "../../order/entity/order.entity";


@Entity("ware")
export class WareEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, type: "varchar"})
  item: string;


  @Column({nullable: true, type: "varchar"})
  image: string;

  @Column({nullable: false, type: "varchar"})
  description: string;

  @Column({nullable: false, type: "numeric"})
  quantity: number;

  @Column({nullable: false, type: "numeric"})
  price: number;

  @ManyToOne(() => CategoryEntity, (category) => category.ware,
    {onDelete: "CASCADE"})
  @JoinColumn({name: "category_id"})
  category: CategoryEntity;

  @ManyToOne(() => ManufacturerEntity, (man) => man.ware,
    {onDelete: "CASCADE"})
  @JoinColumn({name: "man_id"})
  man: ManufacturerEntity;
}