import { Routes } from '@angular/router';
import { CarProfileComponent } from './features/car-profile/car-profile.component';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { UserCarsComponent } from './features/user-cars/user-cars.component';

export const routes: Routes = [
   {
      path: 'login',
      component: LoginPageComponent
   },
   {
      path: '',
      component: UserCarsComponent
   },
   {
      path: 'car/:carId',
      component: CarProfileComponent
   }
];
