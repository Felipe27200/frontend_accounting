import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FormStatement } from '../FormStatement';
import { DateFormatterService } from '@services/date-formatter.service';

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
    end_date: []
  });

  constructor (
    private fb: FormBuilder,
    private dateFormatter: DateFormatterService,
    private router: Router,
    private route: ActivatedRoute,
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
    
    if (!this.validateFieldDate(this.init_date.value, 'init date'))
      return;

    if (this.end_date.value !== null && this.end_date != undefined)
    {      
      if (!this.validateFieldDate(this.end_date.value, 'end date'))
        return;
    }
      
    let formData: FormStatement = {
      name: this.name.value,
      initDate: (this.init_date.value instanceof Date || (typeof this.init_date.value == 'string') ? this.init_date.value : new Date()),
      endDate: this.end_date.value,
    };

    this.onSubmit.emit(formData);
  }

  validateFieldDate(date: Date | string | DateConstructor, message: string): boolean
  {
    if (!(date instanceof Date) && !(typeof date == 'string'))
      {
        this.errors.push(`The ${message} must be a DATE`);
        return false;
      }
  
      if (typeof date === 'string' && !this.dateFormatter.isDate(date))
      {
        this.errors.push(`The ${message} must be a DATE`);
        return false;
      }

      return true;
  }

  get name() { return this.statementForm.controls.name; }
  get init_date() { return this.statementForm.controls.init_date; }
  get end_date() { return this.statementForm.controls.end_date; }
}
