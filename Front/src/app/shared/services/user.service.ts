import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../interfaces/UserDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http: HttpClient) { }

  userLogin(loginData: any) {
    return this.http.post(`http://localhost:3000/api/user/login`, loginData);
  }

  userRegister(registerData: UserDto) {
    return this.http.post(`http://localhost:3000/api/user/register`, registerData);
  }
}
