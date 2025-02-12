import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuelHistory, LastMonthsData } from '../../features/car-profile/car-profile.component';
import { FuelDto } from '../interfaces/FuelDto';

@Injectable({
  providedIn: 'root'
})

export class FuelService {

  constructor(private http: HttpClient) { }

  createFuel(fuelInfo: FuelDto, carId: number) {
    return this.http.post(`http://localhost:3000/api/fuel/create/${carId}`, fuelInfo);
  }

  getFuelData(carId: number, months: number): Observable<LastMonthsData> {
    return this.http.get<LastMonthsData>(`http://localhost:3000/api/fuel/average/${carId}/${months}`);
  }

  getFuelHistory(carId: number, months: number): Observable<FuelHistory[]> {
    return this.http.get<FuelHistory[]>(`http://localhost:3000/api/fuel/history/${carId}/${months}`);
  }
}
