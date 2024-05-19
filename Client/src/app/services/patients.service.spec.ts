import { PatientsService } from './patients.service';
import { APIService } from './api.service';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Patient } from '../Models/patient.model';

describe('PatientsService', () => {
  let service: PatientsService;
  let apiServiceSpy: jasmine.SpyObj<APIService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('APIService', ['get', 'post']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: APIService, useValue: spy }]
    });
    service = TestBed.inject(PatientsService);
    apiServiceSpy = TestBed.inject(APIService) as jasmine.SpyObj<APIService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of patients', () => {
    const patients: Patient[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', gender: 'Male', nationality: 'American', dob: new Date(), nicNo: 12345, mobileNo: 1234567890, email: 'john@example.com', address: '123 Street', username: 'john', password: 'password', fullName: 'John Doe', height: '180cm', weigth: '75kg', bloodtype: 'A+' }
    ];

    apiServiceSpy.get.and.returnValue(of(patients));

    service.getAllPatients().subscribe(result => {
      expect(result).toEqual(patients);
    });

    expect(apiServiceSpy.get).toHaveBeenCalledWith('/api/Patients');
  });

  it('should add a new patient', () => {
    const newPatient: Patient = { id: 2, firstName: 'Jane', lastName: 'Doe', gender: 'Female', nationality: 'American', dob: new Date(), nicNo: 54321, mobileNo: 987654321, email: 'jane@example.com', address: '456 Street', username: 'jane', password: 'password', fullName: 'Jane Doe', height: '165cm', weigth: '55kg', bloodtype: 'B-' };
    
    apiServiceSpy.post.and.returnValue(of(newPatient));

    service.addPatient(newPatient).subscribe(result => {
      expect(result).toEqual(newPatient);
    });

    expect(apiServiceSpy.post).toHaveBeenCalledWith('/api/Patients', newPatient);
  });
});
