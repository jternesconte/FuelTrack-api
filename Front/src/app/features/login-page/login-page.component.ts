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
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


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
    FormsModule,
    PanelModule,
    ToastModule],
  providers: [MessageService]
})
export class LoginPageComponent implements OnInit {

  formGroup: FormGroup;

  loginData: userLoginDto | undefined;
  registerData: UserRegisterDto | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.formGroup = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      password2: ['']
    });
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    this.loginData = undefined;
    this.loginData = {
      email: this.formGroup.get('email')?.value,
      password: this.formGroup.get('password')?.value
    }

    this.userService.userLogin(this.loginData).subscribe({
      next: (value) => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Successfully logged' });
        this.router.navigate(['/userCars']);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.error });
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
        this.router.navigate(['/userCars']);
      },
      error: (err) => {
      },
    });
  }

}
