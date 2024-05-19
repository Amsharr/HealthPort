import { TestBed } from '@angular/core/testing';

import { DoctorService } from './doctor.service';
import { APIService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DoctorService', () => {
  let service: DoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: APIService}]
    });
    service = TestBed.inject(DoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
