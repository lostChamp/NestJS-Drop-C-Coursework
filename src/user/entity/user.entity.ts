import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {RoleEntity} from "../../role/entity/role.entity";



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

  @CreateDateColumn()
  created_at: Date;
}