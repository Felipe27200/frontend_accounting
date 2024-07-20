import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialStatementUpdateComponent } from './financial-statement-update.component';

describe('FinancialStatementUpdateComponent', () => {
  let component: FinancialStatementUpdateComponent;
  let fixture: ComponentFixture<FinancialStatementUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialStatementUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialStatementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
