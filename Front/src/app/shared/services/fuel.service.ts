import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LastMonthsData } from '../../features/car-profile/car-profile.component';
import { FuelDto } from '../interfaces/FuelDto';

@Injectable({
  providedIn: 'root'
})

export class FuelService {

  constructor(private http: HttpClient) { }

  createFuel(fuelInfo: FuelDto, carId: number) {
    return this.http.post(`http://localhost:3000/api/fuel/create/${carId}`, fuelInfo);
  }

  getCarData(carId: number, months: number): Observable<LastMonthsData> {
    return this.http.get<LastMonthsData>(`http://localhost:3000/api/fuel/average/${carId}/${months}`);
  }
}
