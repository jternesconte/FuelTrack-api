import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../interfaces/UserDto';
import { map, Observable } from 'rxjs';

interface LoginResponse {
  msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userLogin(loginData: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`http://localhost:3000/api/user/login`, loginData, { withCredentials: true });
  }

  userRegister(registerData: UserDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`http://localhost:3000/api/user/register`, registerData, { withCredentials: true });
  }
}
