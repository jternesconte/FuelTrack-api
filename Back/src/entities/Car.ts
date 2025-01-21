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
  category: string;

  @Column({ type: "decimal", precision: 12, scale: 1, default: 0, nullable: false })
  km: number;

  @Column({ name: 'fuel_capacity', type: "varchar", length: 100, nullable: false })
  fuelCapacity: number;

  @Column({ type: "bytea", nullable: true })
  image: Buffer | string;
}