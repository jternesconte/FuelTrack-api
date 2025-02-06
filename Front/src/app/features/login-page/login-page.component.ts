import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../shared/services/user.service';
import { TabsModule } from 'primeng/tabs';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { userLoginDto, UserRegisterDto } from '../../shared/interfaces/UserDto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../../../styles.css'],
  imports: [
    CardModule,
    CarouselModule,
    CommonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    TabsModule,
    FloatLabelModule,
    PasswordModule,
    ReactiveFormsModule,
    FormsModule]
})
export class LoginPageComponent implements OnInit {

  formGroup: FormGroup;

  loginData: userLoginDto | undefined;
  registerData: UserRegisterDto | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      name:[''],
      email: [''],
      password: [''],
      password2: ['']
    });
  }

  ngOnInit() {
    if(localStorage.getItem('token')) {
      this.router.navigate(['/userCars'])
    }
  }

  onLoginSubmit() {
    this.loginData = undefined;
    this.loginData = {
      email: this.formGroup.get('email')?.value,
      password: this.formGroup.get('password')?.value
    }
    
    this.userService.userLogin(this.loginData).subscribe({
      next: (value) => {
          localStorage.setItem('token', value['token']);
          this.router.navigate(['/userCars']);
      },
      error: (err) => {
          console.log(err);
      },
    });
  }

  onRegisterSubmit() {
    this.registerData = undefined;
    this.registerData = {
      name: this.formGroup.get('name')?.value,
      email: this.formGroup.get('email')?.value,
      password: this.formGroup.get('password')?.value,
      password2: this.formGroup.get('password2')?.value
    }

    this.userService.userRegister(this.registerData).subscribe({
      next: (value) => {
          localStorage.setItem('token', value['token']);
          this.router.navigate(['/userCars']);
      },
      error: (err) => {
          console.log(err);
      },
    });
  }

}
