import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Patient } from '../Models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseApiUrl + '/api/Patients');
  }

  addPatient(patientRegistration: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.baseApiUrl + '/api/Patients', patientRegistration);
  }
}