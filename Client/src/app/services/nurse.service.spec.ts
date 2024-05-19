import { NurseService } from './nurse.service';
import { APIService } from './api.service';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Nurse } from '../Models/nurse.model';

describe('NurseService', () => {
  let service: NurseService;
  let apiServiceSpy: jasmine.SpyObj<APIService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('APIService', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: APIService, useValue: spy }]
    });
    service = TestBed.inject(NurseService);
    apiServiceSpy = TestBed.inject(APIService) as jasmine.SpyObj<APIService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of nurses', () => {
    const nurses: Nurse[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', dob: new Date(), nicNo: 12345, mobileNo: 1234567890, email: 'john@example.com', address: '123 Street', username: 'john', password: 'password', doctorId: 1 },
      { id: 2, firstName: 'Jane', lastName: 'Doe', dob: new Date(), nicNo: 54321, mobileNo: 987654321, email: 'jane@example.com', address: '456 Street', username: 'jane', password: 'password', doctorId: 2 }
    ];

    apiServiceSpy.get.and.returnValue(of(nurses));

    service.getAllNurses().subscribe(result => {
      expect(result).toEqual(nurses);
    });

    expect(apiServiceSpy.get).toHaveBeenCalledWith('/api/Nurses');
  });

  it('should add a new nurse', () => {
    const newNurse: Nurse = { id: 3, firstName: 'Alice', lastName: 'Smith', dob: new Date(), nicNo: 67890, mobileNo: 9876543210, email: 'alice@example.com', address: '789 Street', username: 'alice', password: 'password', doctorId: 3 };
    
    apiServiceSpy.post.and.returnValue(of(newNurse));

    service.addNurse(newNurse).subscribe(result => {
      expect(result).toEqual(newNurse);
    });

    expect(apiServiceSpy.post).toHaveBeenCalledWith('/api/Nurses', newNurse);
  });

  it('should update a nurse', () => {
    const updatedNurse: Nurse = { id: 1, firstName: 'John', lastName: 'Doe', dob: new Date(), nicNo: 12345, mobileNo: 1234567890, email: 'john@example.com', address: '123 Street', username: 'john', password: 'newpassword', doctorId: 1 };

    apiServiceSpy.put.and.returnValue(of(updatedNurse));

    service.editNurse(updatedNurse).subscribe(result => {
      expect(result).toEqual(updatedNurse);
    });

    expect(apiServiceSpy.put).toHaveBeenCalledWith('/api/Nurses/update', updatedNurse);
  });

  it('should delete a nurse by id', () => {
    const nurseIdToDelete = 1;

    apiServiceSpy.delete.and.returnValue(of(null));

    service.deleteNurseById(nurseIdToDelete).subscribe(result => {
      expect(result).toBeNull();
    });

    expect(apiServiceSpy.delete).toHaveBeenCalledWith('/api/Nurses/delete', nurseIdToDelete);
  });

  it('should get patients by nurse id', () => {
    const nurseId = 1;
    const patients = [{ id: 1, name: 'Patient A' }, { id: 2, name: 'Patient B' }];

    apiServiceSpy.get.and.returnValue(of(patients));

    service.getPatientsByNurseId(nurseId).subscribe(result => {
      expect(result).toEqual(patients);
    });

    expect(apiServiceSpy.get).toHaveBeenCalledWith(`/api/Nurses/getPatients/${nurseId}`);
  });
});
