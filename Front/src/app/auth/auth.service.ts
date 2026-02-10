import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  private http: HttpClient;

  isAuthenticated(): boolean {
    return !!document.cookie.includes('accessToken') || !!document.cookie.includes('refreshToken');
  }

  checkAuth(): Observable<boolean> {
    return this.http.get<{ isAuthenticated: boolean }>('http://localhost:3000/api/user/check-auth', { withCredentials: true }).pipe(
      map(res => res.isAuthenticated),
      catchError(() => of(false))
    );
  }

  refreshToken(): Observable<any> {
    return this.http.post('http://localhost:3000/api/user/refresh-token', {}, { withCredentials: true });
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
