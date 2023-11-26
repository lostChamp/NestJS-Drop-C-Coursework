import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";
import { WareEntity } from "../../lot/entity/ware.entity";
import { ServiceEntity } from "../../service/entity/service.entity";


@Entity("order")
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true, type: "varchar"})
  description: string;

  @Column({nullable: false, unique: true, type: "varchar"})
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.order,
    {onDelete: "CASCADE"})
  @JoinColumn({name: "user_id"})
  user: UserEntity;

  @ManyToOne(() => WareEntity, (ware) => ware.order,
    {onDelete: "CASCADE"})
  @JoinColumn({name: "ware_id"})
  ware: WareEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.order,
    {onDelete: "CASCADE"})
  @JoinColumn({name: "service_id"})
  service: ServiceEntity;
}