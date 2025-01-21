import { CarDto } from '../interfaces/CarDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  constructor(private http: HttpClient) { }


  getCarById(carId: number): Observable<CarDto> {
    return this.http.get<CarDto>(`http://localhost:3000/api/car/getById/${carId}`)
  }
}
