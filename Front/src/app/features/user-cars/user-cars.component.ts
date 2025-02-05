import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDto } from '../../shared/interfaces/CarDto';
import { CarService } from '../../shared/services/car.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cars',
  templateUrl: './user-cars.component.html',
  styleUrls: ['./user-cars.component.css', '../../../styles.css'],
  imports: [CardModule, CommonModule, ButtonModule]
})
export class UserCarsComponent implements OnInit {

  carObservable!: Observable<CarDto[]>;

  constructor(
    private carService: CarService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carObservable =  this.carService.getUserCars();
  }

  onMoreDetails(carId: number) {
    this.router.navigate([`car/${carId}`]);
  }

  onFuel(carId: number) {
    this.router.navigate([`fuel/${carId}`]);
  }
}
