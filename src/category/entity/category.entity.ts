import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("category")
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true, type: "varchar"})
  name: string;
}