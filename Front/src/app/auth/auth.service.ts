import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
