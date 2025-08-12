import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialStatementCenterComponent } from './financial-statement-center.component';

describe('FinancialStatementCenterComponent', () => {
  let component: FinancialStatementCenterComponent;
  let fixture: ComponentFixture<FinancialStatementCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialStatementCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialStatementCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
