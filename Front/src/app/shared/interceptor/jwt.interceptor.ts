import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const modifiedReq = req.clone({
    withCredentials: true
  });

  return next(modifiedReq).pipe(
    catchError((error) => {
      if (error.status === 401 && !req.url.includes('auth') && !req.url.includes('login')) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            return next(modifiedReq);
          }),
          catchError((refreshErr) => {
            authService.redirectToLogin();
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
