import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Doctor } from '../Models/doctor.model';
import { Speciality } from '../Models/speciality.model';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.baseApiUrl + '/api/Doctors');
  }

  addDoctor(doctorRegistration: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.baseApiUrl + '/api/Doctors', doctorRegistration);
  }

  //api to get specialities

  getAllSpecialities(): Observable<Speciality[]> {
    return this.http.get<Speciality[]>(this.baseApiUrl + '/api/Specialities');
  }
}
