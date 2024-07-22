import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FormStatement } from '../FormStatement';

@Component({
  selector: 'app-financial-statement-form',
  templateUrl: './financial-statement-form.component.html',
  styleUrl: './financial-statement-form.component.css'
})
export class FinancialStatementFormComponent implements OnChanges {
  @Input() title?: string;
  @Input() enableButton: boolean = false;
  @Input() statement?: any;

  @Output() onSubmit = new EventEmitter(); 

  dateFormat = 'yy-mm-dd';
  errors: any[] = [];

  statementForm = this.fb.group({
    name: ['', Validators.required],
    init_date: [Date, Validators.required],
    end_date: [Date]
  });

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["statement"] === null || changes["statement"] === undefined 
      || changes["statement"].currentValue === null || changes["statement"].currentValue === undefined)
    {
      return;
    }

    this.statement = changes["statement"].currentValue;

    this.statementForm.controls.name.setValue(this.statement.name);
    this.statementForm.controls.init_date.setValue(this.statement.initDate);
    this.statementForm.controls.end_date.setValue(this.statement.endDate);
  }

  validateForm()
  {
    this.errors = [];

    console.dir(this.statementForm.controls);

    if (!this.statementForm.valid)
    {
      this.errors.push('Check the form something is wrong!!!');
      return;
    }

    if (this.name.value === undefined || this.name.value === null)
    {
      this.errors.push('The name field does not be empty');
      return;
    }

    if (this.name.value.trim().length <= 0)
    {
      this.errors.push('The name field does not be empty');
      return;
    }

    if ((this.init_date.value === undefined || this.init_date.value === null))
    {
      this.errors.push('The init date is required');
      return;
    }
    
    if (!(this.init_date.value instanceof Date))
    {
      this.errors.push('The init date must be a DATE');
      return;
    }
    
    if (!(this.end_date.value instanceof Date))
    {
      this.statementForm.controls.end_date.setValue(null);
    }
  
    let formData: FormStatement = {
      name: this.name.value,
      initDate: this.init_date.value,
      endDate: this.end_date.value,
    };

    this.onSubmit.emit(formData);
  }

  get name() { return this.statementForm.controls.name; }
  get init_date() { return this.statementForm.controls.init_date; }
  get end_date() { return this.statementForm.controls.end_date; }
}
