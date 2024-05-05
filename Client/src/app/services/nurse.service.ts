import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Nurse } from '../Models/nurse.model';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  endpoint: string = '/api/Nurses';
  constructor(private apiService: APIService) { }

  getAllNurses(): Observable<Nurse[]> {
    return this.apiService.get<Nurse>(this.endpoint);
  }

  addNurse(nurseRegistration: Nurse): Observable<Nurse> {
    return this.apiService.post<Nurse>(this.endpoint, nurseRegistration);
  }

  //update Nurse
  editNurse(updateNurse: Nurse): Observable<Nurse>{
    const updateEndpoint = this.endpoint + '/update'
    return this.apiService.put<Nurse>(updateEndpoint,updateNurse);
  }

  //delete Nurse account
  deleteNurseById(nurseId: number): Observable<any> {
    const deleteEndpoint = this.endpoint + '/delete';
    return this.apiService.delete<any>(deleteEndpoint, nurseId);
  }
}
