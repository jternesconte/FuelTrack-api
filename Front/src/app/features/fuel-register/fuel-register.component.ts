import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-fuel-register',
  templateUrl: './fuel-register.component.html',
  styleUrls: ['./fuel-register.component.css', '../../../styles.css'],
  imports: [ReactiveFormsModule, FormsModule, CardModule, FloatLabelModule, ButtonModule]
})
export class FuelRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onFuelSubmit() {

  }

}
