import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '@services/user.service';
import { signup } from 'app/interface/signup';

@Component({
  selector: 'app-user-create',
  standalone: false,
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent 
{
  private router = inject(Router);

  signUpForm = this.fb.group({
    newName: ["", Validators.required],
    newPassword: ["", Validators.required],
    newUsername: ["", Validators.required],
  });

  errors: any[] = [];

  constructor (
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  onSumbit()
  {
    if (!this.signUpForm.valid)
      return;

    let newUser: signup = {} as signup;

    if ((this.name !== null && this.name !== undefined)
      && this.name.value !== null && this.name.value !== undefined)
    {
      newUser.name = this.name?.value;
    }

    if ((this.username !== null && this.username !== undefined)
      && this.username.value !== null && this.username.value !== undefined)
    {
      newUser.username = this.username?.value;
    }

    if ((this.password !== null && this.password !== undefined)
      && this.password.value !== null && this.password.value !== undefined)
    {
      newUser.password = this.password?.value;
    }

    this.errors = [];

    this.userService.signup(newUser)
      .subscribe({
        next: (response: any) => {
          this.router.navigate(["/login"], {
            queryParams: { message: "User was created." }
          });
        },
        error: (e) => {
          if (e.error.hasOwnProperty("errors"))
            this.errors = e.error.errors;
          else
            this.errors.push(e.error.message);
        }
      });
  }

  get name() { return this.signUpForm.get("newName"); }
  get password() { return this.signUpForm.get("newPassword"); }
  get username() { return this.signUpForm.get("newUsername"); }
}
