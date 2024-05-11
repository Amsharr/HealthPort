import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Doctor } from '../Models/doctor.model';
import { Speciality } from '../Models/speciality.model';
import { APIService } from './api.service';
import { Schedules } from '../Models/schedule.model';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  endpoint: string = '/api/Doctors';

  constructor(private apiService: APIService) { }

  //get all doctors
  getAllDoctors(): Observable<Doctor[]> {
    return this.apiService.get<Doctor>(this.endpoint);
  }

  //add doctor 
  addDoctor(doctorRegistration: Doctor): Observable<Doctor> {
    return this.apiService.post<Doctor>(this.endpoint,doctorRegistration);
  }

  //update doctor
  editDoctor(updateDoctor: Doctor): Observable<Doctor>{
    const updateEndpoint = this.endpoint + '/update'
    return this.apiService.put<Doctor>(updateEndpoint,updateDoctor);
  }

  //delete doctor account
  deleteDoctorById(doctorId: number): Observable<any> {
    const deleteEndpoint = this.endpoint + '/delete';
    return this.apiService.delete<any>(deleteEndpoint, doctorId);
  }

  //api to get specialities
  getAllSpecialities(): Observable<Speciality[]> {
    const specialityEndpoint = '/api/Specialities';
    return this.apiService.get<Speciality>(specialityEndpoint);
  }

  getDoctorBySpeciality(specialityId: number): Observable<Doctor[]> {
    const getDoctorBySpecialityEndpoint = `${this.endpoint}/getDoctorBySpeciality/${specialityId}`;
    return this.apiService.get<Doctor>(getDoctorBySpecialityEndpoint);
  }

  getScheduleByDoctorId(doctorId:number): Observable<Schedules[]>{
    const getEndpoint = `${this.endpoint}/getSchedule/${doctorId}`;
    return this.apiService.get<Schedules>(getEndpoint);
  }

  addDoctorSchedule(newSchedule: Schedules): Observable<Schedules> {
    const newEndpoint = `${this.endpoint}/addSchedule`
    return this.apiService.post<Schedules>(newEndpoint,newSchedule);
  } 

  //delete doctor account
  deleteScheduleById(scheduleId: number): Observable<any> {
    const deleteEndpoint = this.endpoint + '/deleteSchedule';
    return this.apiService.delete<any>(deleteEndpoint, scheduleId);
  }

  //update Schedule
  editSchedule(updateschedule: Schedules): Observable<Schedules>{
    const updateEndpoint = this.endpoint + '/updateSchedule'
    return this.apiService.put<Schedules>(updateEndpoint,updateschedule);
  }

}
