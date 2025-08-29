import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrdersComponent } from './all-orders.component';

describe('AllOrderdComponent', () => {
  let component: AllOrdersComponent;
  let fixture: ComponentFixture<AllOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllOrderdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOrderdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
