import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "../../order/entity/order.entity";


@Entity("service")
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, type: "varchar"})
  name: string;

  @Column({nullable: false, type: "varchar"})
  description: string;

  @Column({nullable: false, type: "numeric"})
  price: number;

  @OneToMany(() => OrderEntity, (order) => order.service)
  order: OrderEntity[];
}