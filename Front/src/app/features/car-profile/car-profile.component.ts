import { Component, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CarService } from '../../shared/services/car.service';
import { CarDto } from '../../shared/interfaces/CarDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { FuelService } from '../../shared/services/fuel.service';
import { CommonModule } from '@angular/common';

export interface LastMonthData {
  averageConsumption: number;
  totalDistance: number;
  totalLiters: number;
}

export interface CarouselData {
  title: string;
  value: number;
}

@Component({
  selector: 'app-car-profile',
  templateUrl: './car-profile.component.html',
  styleUrls: ['./car-profile.component.css'],
  imports: [CardModule, CarouselModule, CommonModule]
})
export class CarProfileComponent implements OnInit {

  carObservable!: Observable<CarDto>;
  lastMonthInfo!: LastMonthData;
  carouselData: CarouselData[] = [];
  isCarousel = signal<boolean>(false);

  constructor(
    private carService: CarService,
    private fuelService: FuelService) {
    this.carObservable =  this.carService.getCarById(8);
    this.fuelService.getCarData(8).subscribe(r => {
      this.lastMonthInfo = r;
      this.carouselData.push({title: 'Consumption Average', value: r.averageConsumption});
      this.carouselData.push({title: 'Distance Traveled', value: r.totalDistance});
      this.carouselData.push({title: 'Liters used', value: r.totalLiters});
      this.isCarousel.set(true);
    })
  }

  ngOnInit() {
  }

  getCarInfo() {
  }

}
