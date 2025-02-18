import { Component, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDto } from '../../shared/interfaces/CarDto';
import { CarService } from '../../shared/services/car.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { Dialog } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { AvatarModule } from 'primeng/avatar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuelService } from '../../shared/services/fuel.service';

@Component({
  selector: 'app-user-cars',
  templateUrl: './user-cars.component.html',
  styleUrls: ['./user-cars.component.css'],
  imports: [CardModule, CommonModule, ButtonModule, MessageModule, Dialog, InputNumberModule, AvatarModule, ReactiveFormsModule, FormsModule]
})
export class UserCarsComponent implements OnInit {

  carObservable!: Observable<CarDto[]>;
  isCarsEmpty: boolean = false;
  formGroup: FormGroup;
  fuelForDistance = signal<number>(0);
  carModel = signal<string>('');
  carImage = signal<string>('');
  carId = signal<number>(0);
  calculateVisible: boolean = false;
  resultVisible: boolean = false;

  constructor(
    private carService: CarService,
    private fuelService: FuelService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      travelDistance: null,
    });
  }

  ngOnInit() {
    this.carObservable =  this.carService.getUserCars();
    this.carObservable.forEach(r => {
      if (r.length === 0) {
        this.isCarsEmpty = true;
      }
    })
  }

  onMoreDetails(carId: number) {
    this.router.navigate([`car/${carId}`]);
  }

  onFuel(carId: number) {
    this.router.navigate([`fuel/${carId}`]);
  }

  onCreateCar() {
    this.router.navigate([`newCar`]);
  }

  showDialog(car: CarDto) {
    this.carModel.set(car.model);
    this.carImage.set(car.image ? car.image : '');
    this.carId.set(car.id);
    this.calculateVisible = true;
  }

  calculateFuel() {
    let calculateData = {
      distance: this.formGroup.get('travelDistance')?.value
    }

    this.fuelService.getFuelCalculate(this.carId(), calculateData).subscribe({
      next: (value) => {
        this.fuelForDistance.set(value);
        this.calculateVisible = false;
        this.resultVisible = true;
        this.formGroup.get('travelDistance')?.setValue(null)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
