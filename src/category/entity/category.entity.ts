import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WareEntity } from "../../lot/entity/ware.entity";


@Entity("category")
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true, type: "varchar"})
  name: string;

  @OneToMany(() => WareEntity, (ware) => ware.man)
  ware: WareEntity[];
}