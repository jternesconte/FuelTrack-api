import { Routes } from '@angular/router';
import { CarProfileComponent } from './features/car-profile/car-profile.component';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { UserCarsComponent } from './features/user-cars/user-cars.component';
import { FuelRegisterComponent } from './features/fuel-register/fuel-register.component';
import { CarCreateComponent } from './features/car-create/car-create.component';

export const routes: Routes = [
   {
      path: '',
      component: LoginPageComponent
   },
   {
      path: 'login',
      component: LoginPageComponent
   },
   {
      path: 'userCars',
      component: UserCarsComponent
   },
   {
      path: 'car/:carId',
      component: CarProfileComponent
   },
   {
      path: 'fuel/:carId',
      component: FuelRegisterComponent
   },
   {
      path: 'newCar',
      component: CarCreateComponent
   }
];
