import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Doctor } from '../Models/doctor.model';
import { Observable } from 'rxjs';
import { WardRoom } from '../Models/wardRoom.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  endpoint: string = '/api/Admin';

  constructor(private apiService: APIService) { }

  //get all wards
  getAllWards(): Observable<WardRoom[]> {
    const endpoint = this.endpoint + '/getWards'
    return this.apiService.get<WardRoom>(endpoint);
  }

  //add ward 
  addWard(ward: WardRoom): Observable<WardRoom> {
    const endpoint = this.endpoint + '/addWard'
    return this.apiService.post<WardRoom>(endpoint,ward);
  }

  //update WardRoom
  editWard(updateWard: WardRoom): Observable<WardRoom>{
    const updateEndpoint = this.endpoint + '/updateWard'
    return this.apiService.put<WardRoom>(updateEndpoint,updateWard);
  }

  //delete WardRoom account
  deleteWardById(wardId: number): Observable<any> {
    const deleteEndpoint = this.endpoint + '/deleteWard';
    return this.apiService.delete<any>(deleteEndpoint, wardId);
  }
}
