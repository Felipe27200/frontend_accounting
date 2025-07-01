import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';

import { CustomToken } from 'app/interface/custom-token';
import { LocalStorageService } from '@services/local-storage.service';
import { CommonResponseService } from '@services/common-response.service';
import { UserService } from '@services/user.service';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css',
  standalone: false,
  providers: [ MessageService ]
})
export class UserUpdateComponent implements OnInit {
  private responseService: CommonResponseService = inject(CommonResponseService);
  private fb: FormBuilder = inject(FormBuilder);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);

  userForm = this.fb.group({ name: ["", Validators.required] });

  errors: any[] = [];

  ngOnInit(): void {
    let tokenStorage = this.localStorageService.getItem("Bearer-token");
    
    if (tokenStorage == null || tokenStorage == undefined
        || tokenStorage == "" || typeof tokenStorage !== "string")
    {
      this.router.navigate(["/accounts"]);
      return;
    }

    let token: string = tokenStorage;
    const decoded = jwtDecode<CustomToken>(token);

    if (decoded.sub === undefined)
    {
      this.router.navigate(["/accounts"]);
      return;
    }

    this.userService.getUserByUsername(decoded.sub)
      .subscribe({
        next: (response: any) => {
          this.name?.setValue(response.name);
        },
        error: (error) => {
          this.messageService.addAll(this.responseService.setToastErrorMessage(error));
        }
      });
  }

  onSubmit()
  {
    this.errors = [];

    if (!this.userForm.valid)
      return;

    if (this.name === undefined || this.name === null)
    {
      this.errors.push("The name is required");
      return;
    }

    if (!this.name.value)
    {
      this.errors.push("The name is required");
      return;
    }

    if (this.name.value.trim().length <= 0)
    {
      this.errors.push("The name can not be empty")
      return;
    }

    let formData = {
      name: this.name.value.trim()
    };

    this.userService.updateUser(formData)
      .subscribe({
        next: (response) => {
          console.dir(response);
          this.name?.setValue(response.name);
          
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Successful!', 
            detail: "Your info was updated" 
          });
          
          this.errors = [];
        },
        error: (error) => {
          this.messageService.addAll(this.responseService.setToastErrorMessage(error));
        }
      });
  }

  get name() { return this.userForm.get('name'); }
}
