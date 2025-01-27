import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../shared/services/user.service';
import { TabsModule } from 'primeng/tabs';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../../../styles.css'],
  imports: [CardModule, CarouselModule, CommonModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, TabsModule]
})
export class LoginPageComponent implements OnInit {

  formGroup: FormGroup;

  loginData: any[] = [];
  registerData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.formGroup = this.fb.group({
      name:'',
      email: '',
      password: '',
      password2: ''
    });
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    this.loginData.push(this.formGroup.get('email')?.value);
    this.loginData.push(this.formGroup.get('password')?.value);
    this.userService.userLogin(this.loginData)
  }

  onRegisterSubmit() {
    this.registerData.push(this.formGroup.get('name')?.value);
    this.registerData.push(this.formGroup.get('email')?.value);
    this.registerData.push(this.formGroup.get('password')?.value);
    this.registerData.push(this.formGroup.get('password2')?.value);
    this.userService.userLogin(this.registerData)
  }

}
