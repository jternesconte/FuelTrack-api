import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LastMonthData } from '../../features/car-profile/car-profile.component';
import { FuelDto } from '../interfaces/FuelDto';

@Injectable({
  providedIn: 'root'
})

export class FuelService {

  constructor(private http: HttpClient) { }

  createFuel(fuelInfo: FuelDto, carId: number) {
    return this.http.post(`http://localhost:3000/api/fuel/create/${carId}`, fuelInfo);
  }

  getCarData(carId: number): Observable<LastMonthData> {
    return this.http.get<LastMonthData>(`http://localhost:3000/api/fuel/average/${carId}`);
  }
}
