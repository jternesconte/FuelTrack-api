import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { lastMonthData } from '../../features/car-profile/car-profile.component';

@Injectable({
  providedIn: 'root'
})

export class FuelService {

  constructor(private http: HttpClient) { }


  getCarData(carId: number): Observable<lastMonthData> {
    return this.http.get<lastMonthData>(`http://localhost:3000/api/fuel/average/${carId}`);
  }
}
