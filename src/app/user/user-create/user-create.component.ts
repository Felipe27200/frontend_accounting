import { Component } from '@angular/core';

import { UserService } from '@services/user.service';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  standalone: false,
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent 
{
  signUpForm = this.fb.group({
    name: ["", Validators.required],
    password: ["", Validators.required],
    username: ["", Validators.required],
  });

  constructor (
    private fb: FormBuilder,
  ) { }

  get name() { return this.signUpForm.get("name"); }
  get password() { return this.signUpForm.get("password"); }
  get username() { return this.signUpForm.get("username"); }
}
