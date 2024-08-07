import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCenterComponent } from './category-center.component';

describe('CategoryCenterComponent', () => {
  let component: CategoryCenterComponent;
  let fixture: ComponentFixture<CategoryCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
