import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("ware")
export class WareEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true, type: "varchar"})
  item: string;


  @Column({nullable: false, unique: true, type: "varchar"})
  image: string;

  @Column({nullable: false, unique: true, type: "varchar"})
  description: string;

  @Column({nullable: false, unique: true, type: "numeric"})
  quantity: number;

  @Column({nullable: false, unique: true, type: "numeric"})
  price: number;

}