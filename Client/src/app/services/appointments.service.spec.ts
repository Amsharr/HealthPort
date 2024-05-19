import { TestBed } from '@angular/core/testing';

import { AppointmentsService } from './appointments.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from './api.service';

describe('AppointmentsService', () => {
  let service: AppointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: APIService}]
    });
    service = TestBed.inject(AppointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
