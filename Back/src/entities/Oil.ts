import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./Car";
import { BooleanToStringConverter } from "../utils/BooleanToStringConverter";

@Entity('oil')
export class Oil {
   @PrimaryGeneratedColumn()
   id: number;

   @ManyToOne(() => Car, { nullable: false })
   @JoinColumn({ name: "car_id", referencedColumnName: 'id' })
   car: Car;
   
   @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
   price: number;

   @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
   date: Date;

   @Column({
      name: "fl_changed_filters",
      type: "char",
      length: 1,
      nullable: false,
      default: 'N',
      transformer: new BooleanToStringConverter(),
    })
   flChangedFilters: boolean;
}