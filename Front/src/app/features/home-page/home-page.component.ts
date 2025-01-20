import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  imports: [ButtonModule]
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
