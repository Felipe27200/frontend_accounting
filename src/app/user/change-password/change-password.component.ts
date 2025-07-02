import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
export class ChangePasswordComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private messageService: MessageService = inject(MessageService);
  private responseService: CommonResponseService = inject(CommonResponseService);
  private userService: UserService = inject(UserService);

  errors: any[] = [];

  passwordForm = this.fb.group({
    confirmPassword: ["", Validators.required],
    currentPassword: ["", Validators.required],
    newPassword: ["", Validators.required],
  });

  onSubmit()
  {
    this.errors = [];

    if (!this.passwordForm.valid)
      return;

    if (this.currentPassword == null || this.currentPassword == undefined)
      this.errors.push("The current password is required");
    if (this.newPassword == null || this.newPassword == undefined)
      this.errors.push("The new password is required");
    if (this.confirmPassword == null || this.confirmPassword == undefined)
      this.errors.push("The Password Confirmation is required");

    if (this.currentPassword?.value == null || this.currentPassword.value == undefined
      || this.currentPassword.value.trim().length <= 0
    ) {
      this.errors.push("The current password is required");
    }
    if (this.newPassword?.value == null || this.newPassword.value == undefined
      || this.newPassword.value.trim().length <= 0
    ) {
      this.errors.push("The new password is required");
    }
    if (this.confirmPassword?.value == null || this.confirmPassword.value == undefined
      || this.confirmPassword.value.trim().length <= 0
    ) {
      this.errors.push("The Password Confirmation is required");
    }

    if (this.newPassword?.value !== this.confirmPassword)
      this.errors.push("The New Password and the Password Confirmation are not equals.");

    if (this.errors.length > 0)
      return;

    let formData = {
      oldPassword: this.currentPassword?.value,
      newPassword: this.newPassword?.value,
      passwordConfirmation: this.confirmPassword?.value,
    }

    this.userService.updatePassword(formData)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Successful!', detail: 'The password was updated' });
        },
        error: (error) => {
          this.messageService.addAll(this.responseService.setToastErrorMessage(error));
        }
      });
  }

  get confirmPassword() { return this.passwordForm.get('confirmPassword'); }
  get currentPassword() { return this.passwordForm.get('currentPassword'); }
  get newPassword() { return this.passwordForm.get('newPassword'); }
}
