import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("car")
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id", referencedColumnName: 'id' })
  user: User;

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

  @Column({ type: "varchar", length: 7, nullable: false })
  plate: string;

  @Column({ type: "bytea", nullable: true })
  image: Buffer | string;
}