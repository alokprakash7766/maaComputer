import { TestBed } from '@angular/core/testing';


describe('RegisterService', () => {
  let service: RegisterServic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
