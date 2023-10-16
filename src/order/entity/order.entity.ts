import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("order")
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true, type: "varchar"})
  description: string;

  @Column({nullable: false, unique: true, type: "varchar"})
  status: string;
}