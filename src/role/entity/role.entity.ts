import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../user/entity/user.entity";


@Entity("role")
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true, type: "varchar"})

  value: string;

  @Column({nullable: false, unique: true, type: "numeric"})
  salary: number;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}