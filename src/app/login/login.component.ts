import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    
  }

  onSubmit()
  {
    if (!this.loginForm.valid)
      return;

    let formData: any = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.userService.login(formData)
      .subscribe((response: any) => {
        this.localStorageService.setItem('Bearer-token', response.body);
      });
  }

  test()
  {
    this.userService.test()
      .subscribe((response: any) => {
        console.log(response);
      })
  }

  get username() { return this.loginForm.controls.username }
  get password() { return this.loginForm.controls.password }
}
