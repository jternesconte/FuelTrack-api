import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("car")
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  model: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  engine: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  year: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  category: string
}