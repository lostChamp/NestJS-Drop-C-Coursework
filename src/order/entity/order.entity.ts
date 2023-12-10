import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";
import { WareEntity } from "../../lot/entity/ware.entity";
import { ServiceEntity } from "../../service/entity/service.entity";
import { JoinTable } from "typeorm";


@Entity("order")
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, type: "varchar"})
  description: string;

  @Column({nullable: false, type: "varchar"})
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.order,
    {onDelete: "CASCADE"})
  @JoinColumn({name: "user_id"})
  user: UserEntity;

  @ManyToMany(() => WareEntity)
  @JoinTable({
    name: "order_ware"
  })
  ware: WareEntity[];

  @ManyToOne(() => ServiceEntity, (service) => service.order,
    {onDelete: "CASCADE"})
  @JoinColumn({name: "service_id"})
  service: ServiceEntity;
}