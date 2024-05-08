import { Component, OnInit } from '@angular/core';
import { Appointments } from '../../../Models/appointment.model';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DoctorService } from '../../../services/doctor.service';
import { SharedService } from '../../../services/shared.service';
import { AppointmentsService } from '../../../services/appointments.service';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit {
  UpcomingAppointments:Appointments[] = [];
  PastAppointments:Appointments[] = [];
  patientId: number = 0;

  constructor(
    private appointmentService: AppointmentsService,
    private router : Router,
    private sharedService :  SharedService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.patientId = +sessionStorage.getItem('patientId') ! || 0;
    this.loadTable(this.patientId);
  }

  loadTable(patientId: number){
    this.appointmentService.getAppointmentsByPatientId(patientId).subscribe(
        (appointments) => {
            const now = new Date();
            this.UpcomingAppointments = appointments.filter(appointment => {
                const appointmentDate = appointment.date ? new Date(appointment.date) : null;

                return (appointmentDate && (appointmentDate > now || (appointmentDate.getTime() >= now.getTime())) && appointment.status === 0
                );
            });
            this.PastAppointments = appointments.filter(appointment => {
              const appointmentDate = appointment.date ? new Date(appointment.date) : null;

              return (
                  appointmentDate &&  (appointmentDate < now || (appointmentDate.getTime() === now.getTime())) || appointment.status === 1
              );
          });
        }
    );
  }

  cancelAppointment(appointmentId: number){
    this.appointmentService.deleteAppointmentById(appointmentId).subscribe({
      next: () => {
        this.loadTable(this.patientId);
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'appointment cancelled', life: 3000 });  
      },
      error: (response) => {
        console.error('Error deleting patient:', response);
      }
    });
  }

  confirmModal(event: Event, appointmentId: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to cancel this appointment?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          this.cancelAppointment(appointmentId);          
        }
    });
  }
}
