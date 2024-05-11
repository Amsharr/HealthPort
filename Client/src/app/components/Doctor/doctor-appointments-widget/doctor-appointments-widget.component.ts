import { Component, OnInit } from '@angular/core';
import { Appointments } from '../../../Models/appointment.model';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppointmentsService } from '../../../services/appointments.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-doctor-appointments-widget',
  templateUrl: './doctor-appointments-widget.component.html',
  styleUrl: './doctor-appointments-widget.component.scss'
})
export class DoctorAppointmentsWidgetComponent implements OnInit{
  UpcomingAppointments:Appointments[] = [];
  doctorId!: number;

  constructor(
    private appointmentService: AppointmentsService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.doctorId = +sessionStorage.getItem('doctorId') ! || 0;
    this.loadTable(this.doctorId);
  }

  loadTable(doctorId: number){
    this.appointmentService.getAppointmentsByDoctorId(doctorId).subscribe(
        (appointments) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            this.UpcomingAppointments = appointments.filter(appointment => {
                const appointmentDate = appointment.date ? new Date(appointment.date) : null;
                return (appointmentDate && appointment.status === 0);
            });
        }
    );
}


  routeToComponent(){
    this.router.navigate(['/doctor/appointments']);
  }
}
