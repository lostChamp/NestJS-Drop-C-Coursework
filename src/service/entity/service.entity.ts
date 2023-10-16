import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("service")
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true, type: "varchar"})
  description: string;

  @Column({nullable: false, unique: true, type: "numeric"})
  price: number;
}