import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("manufacturer")
export class ManufacturerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true, type: "varchar"})
  name: string;
}