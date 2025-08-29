import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrderdComponent } from './all-orderd.component';

describe('AllOrderdComponent', () => {
  let component: AllOrderdComponent;
  let fixture: ComponentFixture<AllOrderdComponent>;

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
