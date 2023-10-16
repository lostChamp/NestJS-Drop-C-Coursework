import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("role")
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true, type: "varchar"})

  value: string;

  @Column({nullable: false, unique: true, type: "numeric"})
  salary: number;
}