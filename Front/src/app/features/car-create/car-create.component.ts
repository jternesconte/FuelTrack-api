import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CarDto } from '../../shared/interfaces/CarDto';
import { CarService } from '../../shared/services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectModule } from 'primeng/select';

interface carModel {
  name: string,
  code: string
}

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css'],
  imports: [CommonModule, InputTextModule, InputNumberModule, ReactiveFormsModule, FormsModule, CardModule, FloatLabelModule, ButtonModule, DatePickerModule, SelectModule]
})
export class CarCreateComponent implements OnInit {

  carModels: carModel[] = [
    { name: 'Hatchback', code: 'Hatchback' },
    { name: 'Sedan', code: 'Sedan' },
    { name: 'SUV', code: 'SUV' },
    { name: 'Coupe', code: 'Coupe' },
    { name: 'Minivan', code: 'Minivan' },
    { name: 'Wagon', code: 'Wagon' },
    { name: 'Convertible', code: 'Convertible' },
  ]


  carForm: FormGroup;
  newCar!: Omit<CarDto, 'id'> | undefined;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private routerNav: Router
  ) {
    this.carForm = this.fb.group({
      model: [],
      engine: [],
      year: [],
      plate: [],
      category: [],
      km: [],
      fuelCapacity: [],
      image: ['']
    });
  }

  ngOnInit() { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.carForm.patchValue({ image: reader.result?.toString().split(',')[1] });
      };
      reader.readAsDataURL(file);
    }
  }

  onCarSubmit() {
    this.newCar = undefined;

    this.newCar = {
      model: this.carForm.get('model')?.value,
      engine: this.carForm.get('engine')?.value,
      year: this.carForm.get('year')?.value,
      plate: this.carForm.get('plate')?.value,
      category: this.carForm.get('category')?.value.name,
      km: this.carForm.get('km')?.value,
      fuelCapacity: this.carForm.get('fuelCapacity')?.value,
      image: this.carForm.get('image')?.value
    };

    this.carService.newCar(this.newCar).subscribe({
      next: (value) => {
        this.routerNav.navigate(['/userCars']);
      },
      error: (err) => {
      },
    });
  }

}
