import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-car-profile',
  templateUrl: './car-profile.component.html',
  styleUrls: ['./car-profile.component.css'],
  imports: [CardModule, CarouselModule]
})
export class CarProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getCarInfo();
  }

  getCarInfo() {

  }

}
