import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  errors = [];

  passwordForm = this.fb.group({
    newPassword: ["", Validators.required],
    confirmPassword: ["", Validators.required]
  });
}
