import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true, type: "varchar"})
  email: string;

  @Column({nullable: false, unique: true, type: "varchar"})
  password: string;

  @Column({nullable: false, unique: true, type: "varchar"})
  full_name: string;

  @Column({nullable: false, unique: true, type: "varchar"})
  phone_number: string;

  @CreateDateColumn()
  created_at: Date;
}