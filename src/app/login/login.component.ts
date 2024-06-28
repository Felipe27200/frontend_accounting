import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

  errors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    
  }

  onSubmit()
  {
    this.errors = [];

    if (!this.loginForm.valid)
      return;

    let formData: any = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.userService.login(formData)
      .subscribe({
        next: (response) => {    
            this.localStorageService.setItem('Bearer-token', response.body);

            this.router.navigate(['/accounts']);
        },
        error: (e) => {
          if (e.error.hasOwnProperty("errors"))
            this.errors = e.error.errors;
          else
            this.errors.push(e.error.message);
        }
      });
  }

  get username() { return this.loginForm.controls.username }
  get password() { return this.loginForm.controls.password }
}
