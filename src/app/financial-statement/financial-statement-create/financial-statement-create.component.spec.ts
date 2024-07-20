import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialStatementCreateComponent } from './financial-statement-create.component';

describe('FinancialStatementCreateComponent', () => {
  let component: FinancialStatementCreateComponent;
  let fixture: ComponentFixture<FinancialStatementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialStatementCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialStatementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
