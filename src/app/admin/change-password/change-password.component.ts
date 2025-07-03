import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonResponseService } from '@services/common-response.service';
import { UserService } from '@services/user.service';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
  providers: [ MessageService ]
})
export class ChangePasswordComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private messageService: MessageService = inject(MessageService);
  private responseService: CommonResponseService = inject(CommonResponseService);
  private userService: UserService = inject(UserService);

  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  errors: any[] = [];
  user: any;

  passwordForm = this.fb.group({
    confirmPassword: ["", Validators.required],
    newPassword: ["", Validators.required],
  });

  ngOnInit(): void {
    let userId = Number(this.route.snapshot.params['id']);

    if (userId === null || userId === undefined || userId <= 0)
      this.router.navigate(["/admin"]);

    this.userService.getUserById(userId)
      .subscribe({
        next: (response: any) => {
          this.user = response;
        },
        error: (error) => {
          this.messageService.addAll(this.responseService.setToastErrorMessage(error));
        }
      });
  }

  onSubmit()
  {
    this.errors = [];

    if (!this.passwordForm.valid)
      return;

    if (this.user == undefined)
    {
      this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'There is no valid user' });
      return;
    }

    if (this.newPassword == null || this.newPassword == undefined)
      this.errors.push("The new password is required");
    if (this.confirmPassword == null || this.confirmPassword == undefined)
      this.errors.push("The Confirm Password is required");

    if (this.newPassword?.value == null || this.newPassword.value == undefined
      || this.newPassword.value.trim().length <= 0
    ) {
      this.errors.push("The new password is required");
    }
    if (this.confirmPassword?.value == null || this.confirmPassword.value == undefined
      || this.confirmPassword.value.trim().length <= 0
    ) {
      this.errors.push("The Confirm Password is required");
    }

    if (this.newPassword?.value !== this.confirmPassword?.value)
      this.errors.push("The New Password and the Confirm Password are not equals.");

    if (this.errors.length > 0)
      return;

    let formData = {
      newPassword: this.newPassword?.value,
      passwordConfirmation: this.confirmPassword?.value,
    }

    this.userService.changePasswordUserByAdmin(this.user.id, formData)
      .subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Successful!', detail: 'The password was updated' });
        },
        error: (error) => {
          this.messageService.addAll(this.responseService.setToastErrorMessage(error));
        }
      });
  }

  get confirmPassword() { return this.passwordForm.get('confirmPassword'); }
  get newPassword() { return this.passwordForm.get('newPassword'); }
}
