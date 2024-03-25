import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Nurse } from '../Models/nurse.model';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllNurses(): Observable<Nurse[]> {
    return this.http.get<Nurse[]>(this.baseApiUrl + '/api/Nurses');
  }

  addNurse(nurseRegistration: Nurse): Observable<Nurse> {
    return this.http.post<Nurse>(this.baseApiUrl + '/api/Nurses', nurseRegistration);
  }
}
