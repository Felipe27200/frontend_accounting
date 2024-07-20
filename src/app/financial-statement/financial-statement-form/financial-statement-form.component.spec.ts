import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialStatementFormComponent } from './financial-statement-form.component';

describe('FinancialStatementFormComponent', () => {
  let component: FinancialStatementFormComponent;
  let fixture: ComponentFixture<FinancialStatementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialStatementFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialStatementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
