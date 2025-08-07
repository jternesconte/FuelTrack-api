import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FuelDto } from '../../shared/interfaces/FuelDto';
import { FuelService } from '../../shared/services/fuel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fuel-register',
  templateUrl: './fuel-register.component.html',
  styleUrls: ['./fuel-register.component.css', '../../../styles.css'],
  imports: [CommonModule, InputTextModule, InputNumberModule, ReactiveFormsModule, FormsModule, CardModule, FloatLabelModule, ButtonModule, DatePickerModule]
})
export class FuelRegisterComponent implements OnInit {

  formGroup: FormGroup;
  newFuel!: FuelDto | undefined;
  carId!: number;

  constructor(
    private fb: FormBuilder,
    private fuelService: FuelService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      price:[],
      liters: [],
      distanceTraveled: [],
      date: ['']
    });

    this.carId = this.route.snapshot.params['carId'];
  }

  ngOnInit() {

  }

  formatDateToISO(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
        .toISOString()
        .replace('Z', '');
  }

  onFuelSubmit() {
    this.newFuel = undefined;

    this.newFuel = {
      price: this.formGroup.get('price')?.value,
      liters: this.formGroup.get('liters')?.value,
      distanceTraveled:this.formGroup.get('distanceTraveled')?.value,
      date: this.formatDateToISO(this.formGroup.get('date')?.value)
    }

    this.fuelService.createFuel(this.newFuel, this.carId).subscribe({
      next: (value) => {
          this.router.navigate(['/userCars']);
      },
      error: (err) => {
          console.log(err)
      },
    });
  }

}
