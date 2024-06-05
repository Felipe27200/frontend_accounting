import { Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Accounting System';
}
