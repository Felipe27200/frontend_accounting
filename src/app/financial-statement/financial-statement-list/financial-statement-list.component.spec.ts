import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialStatementListComponent } from './financial-statement-list.component';

describe('FinancialStatementListComponent', () => {
  let component: FinancialStatementListComponent;
  let fixture: ComponentFixture<FinancialStatementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialStatementListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialStatementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
