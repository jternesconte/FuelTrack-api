import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CarService } from '../../shared/services/car.service';
import { CarDto } from '../../shared/interfaces/CarDto';
import { Observable } from 'rxjs';
import { FuelService } from '../../shared/services/fuel.service';

export interface lastMonthData {
  averageConsumption: number;
  totalDistance: number;
  totalLiters: number;
}

@Component({
  selector: 'app-car-profile',
  templateUrl: './car-profile.component.html',
  styleUrls: ['./car-profile.component.css'],
  imports: [CardModule, CarouselModule]
})
export class CarProfileComponent implements OnInit {

  car!: CarDto;
  lastMonthInfo!: lastMonthData;

  constructor(
    private carService: CarService,
    private fuelService: FuelService) {
    this.carService.getCarById(8).subscribe(r => this.car = r);
    this.fuelService.getCarData(8).subscribe(r => this.lastMonthInfo  =r)
  }

  ngOnInit() {

  }

  getCarInfo() {
  }

}
