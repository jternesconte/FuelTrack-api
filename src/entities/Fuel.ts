import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./Car";

@Entity('fuel')
export class Fuel {
   @PrimaryGeneratedColumn()
   id: number;

   @ManyToOne(() => Car, { nullable: false })
   @JoinColumn({ name: "car_id", referencedColumnName: 'id' })
   car: Car;
   
   @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
   price: number;

   @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
   liters: number;

   @Column({ name: 'distance_traveled', type: "decimal", precision: 10, scale: 1, nullable: true })
   distanceTraveled: number;

   @Column({ name: 'average_last_route', type: "decimal", precision: 10, scale: 2, nullable: true })
   averageLastRoute: number;

   @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
   date: Date;
}