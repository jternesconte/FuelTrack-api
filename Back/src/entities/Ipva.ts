import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./Car";

@Entity('ipva')
export class Ipva {
   @PrimaryGeneratedColumn()
   id: number;

   @ManyToOne(() => Car, { nullable: false })
   @JoinColumn({ name: "car_id", referencedColumnName: 'id' })
   car: Car;
   
   @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
   price: number;

   @Column({ name: "oil_type", type: "varchar", length: 100, nullable: false })
   oilType: string;

   @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
   date: Date;
}