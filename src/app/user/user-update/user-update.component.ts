import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css',
  standalone: false,
})
export class UserUpdateComponent {
  private fb: FormBuilder = inject(FormBuilder);

  userForm = this.fb.group([
    { name: ["", Validators] }
  ]);
}
