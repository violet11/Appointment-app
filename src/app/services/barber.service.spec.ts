import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BarberService } from './barber.service';

describe('BarberService', () => {
  let service: BarberService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(BarberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
