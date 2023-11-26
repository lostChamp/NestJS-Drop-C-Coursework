import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {RoleEntity} from "../../role/entity/role.entity";
import { WareEntity } from "../../lot/entity/ware.entity";
import { OrderEntity } from "../../order/entity/order.entity";



@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true, type: "varchar"})
  email: string;

  @Column({nullable: false, type: "varchar"})
  password: string;

  @Column({nullable: false, type: "varchar"})
  full_name: string;

  @Column({nullable: false, type: "varchar"})
  phone_number: string;

  @ManyToOne(() => RoleEntity, (role) => role.users, {
    onDelete: "CASCADE"
  })
  @JoinColumn({name: "role_id"})
  role: RoleEntity;

  @OneToMany(() => OrderEntity, (order) => order.user)
  order: OrderEntity[];

  @CreateDateColumn()
  created_at: Date;
}