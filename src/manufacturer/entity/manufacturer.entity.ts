import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WareEntity } from "../../lot/entity/ware.entity";


@Entity("manufacturer")
export class ManufacturerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true, type: "varchar"})
  name: string;

  @OneToMany(() => WareEntity, (ware) => ware.man)
  ware: WareEntity[];
}