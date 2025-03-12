import { Component, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CarService } from '../../shared/services/car.service';
import { CarDto } from '../../shared/interfaces/CarDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { FuelService } from '../../shared/services/fuel.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectButton, SelectButtonModule } from 'primeng/selectbutton';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface LastMonthsData {
  averageConsumption: number;
  totalDistance: number;
  totalLiters: number;
}

export interface CarouselData {
  title: string;
  value: number;
}

export interface FuelHistory {
  date: string;
  liters: number;
  price: number;
}

@Component({
  selector: 'app-car-profile',
  templateUrl: './car-profile.component.html',
  styleUrls: ['./car-profile.component.css', '../../../styles.css'],
  imports: [CardModule, CarouselModule, CommonModule, SelectButton, SelectButtonModule, ReactiveFormsModule]
})
export class CarProfileComponent implements OnInit {

  formGroup: FormGroup;
  carObservable!: Observable<CarDto>;
  lastMonthInfo!: LastMonthsData;
  carouselData: CarouselData[] = [];
  fuelHistory: FuelHistory[] = [];
  isCarousel = signal<boolean>(false);
  carId!: number;
  monthsOptions: any[] = [{ label: '1 Month', value: 1 }, { label: '3 Months', value: 3 }, { label: '6 Months', value: 6 }];

  constructor(
    private carService: CarService,
    private fb: FormBuilder,
    private fuelService: FuelService,
    private route: ActivatedRoute,
    private router: Router) {
      this.formGroup = this.fb.group({
        months: 1,
        monthsHistory: 1
      });
  }

  ngOnInit() {
    this.carId = this.route.snapshot.params['carId'];
    this.carObservable =  this.carService.getCarById(this.carId);

    this.formGroup.get('months')?.valueChanges.subscribe({
      next: (value) => {
        this.getCarInfo(value);
      },
    });

    this.formGroup.get('monthsHistory')?.valueChanges.subscribe({
      next: (value) => {
        this.loadFuelHistory(value);
      },
    });

    this.formGroup.get('months')?.setValue(1);
    this.formGroup.get('monthsHistory')?.setValue(1);
  }

  getCarInfo(months: any) {
    this.fuelService.getFuelData(this.carId, months).subscribe(r => {
      this.carouselData =[];
      this.lastMonthInfo = r;
      this.carouselData.push({title: 'Consumption Average', value: r.averageConsumption});
      this.carouselData.push({title: 'Distance Traveled', value: r.totalDistance});
      this.carouselData.push({title: 'Liters used', value: r.totalLiters});
      this.isCarousel.set(true);
    });
  }

  loadFuelHistory(months: any) {
    this.fuelService.getFuelHistory(this.carId, months).subscribe(r => {
      this.fuelHistory = r;
    });
  }

  navigateToOilRegister() {
    this.router.navigate([`/oilChange/${this.carId}`]);
  }
  
  navigateToIpvaRegister() {
    this.router.navigate([`/ipva/${this.carId}`]);
  }
}
