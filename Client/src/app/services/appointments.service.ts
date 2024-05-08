import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Appointments } from '../Models/appointment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  endpoint: string = '/api/Appointments';

  constructor(private apiService: APIService) { }

  bookAppointment(appointmentRequest: Appointments): Observable<Appointments>{
    return this.apiService.post<Appointments>(this.endpoint, appointmentRequest);
  };

  getAllAppointments(): Observable<Appointments[]> {
    return this.apiService.get<Appointments>(this.endpoint);
  }

  deleteAppointmentById(appointmentId: number): Observable<any> {
    const deleteEndpoint = this.endpoint + '/delete';
    return this.apiService.delete<any>(deleteEndpoint, appointmentId);
  }

  getAppointmentsByPatientId(patientId: number): Observable<Appointments[]> {
    const getendpoint = `${this.endpoint}/getAppointmentByPid/${patientId}`
    return this.apiService.get<Appointments>(getendpoint);
  }
}
