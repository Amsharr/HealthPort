import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Patient } from '../Models/patient.model';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private endpoint: string = '/api/Patients'
  
  constructor(private apiService: APIService) { }

  getAllPatients(): Observable<Patient[]> {
    return this.apiService.get<Patient>(this.endpoint);
  }

  addPatient(patientRegistration: Patient): Observable<Patient> {
    return this.apiService.post<Patient>(this.endpoint,patientRegistration);
  }

  editPatient(updatePatient: Patient): Observable<Patient>{
    const updateEndpoint = this.endpoint + '/update'
    return this.apiService.put<Patient>(updateEndpoint,updatePatient)
  }
}
