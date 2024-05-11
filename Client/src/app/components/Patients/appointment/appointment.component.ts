import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Appointments } from '../../../Models/appointment.model';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DoctorService } from '../../../services/doctor.service';
import { SharedService } from '../../../services/shared.service';
import { AppointmentsService } from '../../../services/appointments.service';
import { timestamp } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Time } from '@angular/common';
import { Doctor } from '../../../Models/doctor.model';
import { Speciality } from '../../../Models/speciality.model';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit {
  private modalService = inject(NgbModal);
  
  UpcomingAppointments:Appointments[] = [];
  PastAppointments:Appointments[] = [];
  patientId: number = 0;
  notesbtnclicked: boolean = false;
  specialities: Speciality[] = [];
  doctors: Doctor[] = [];
  availableTimes: Time[] = [];

  appointment: Appointments ={
    id : 0,
    specialityid: 0, 
    patientName:'',
    patientId : 0,
    doctorid : 0,
    doctorName:'',
    date : new Date(1984, 6, 18),
    time : null,
    paymentMethod:'',
    paymentid : 1,
    paymentStatus:'',
    status:0,
    doctorNotes:null, 
    amountPayable:null
  }

  constructor(
    private appointmentService: AppointmentsService,
    private router : Router,
    private sharedService :  SharedService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private doctorService: DoctorService,
    private apiService: APIService,
  ) {}

  ngOnInit(): void {
    this.loadSpecialites();
    this.patientId = +sessionStorage.getItem('patientId') ! || 0;
    this.loadTable(this.patientId);
  }

  loadTable(patientId: number){
    this.appointmentService.getAppointmentsByPatientId(patientId).subscribe(
        (appointments) => {
          const today: Date = new Date();   
            this.UpcomingAppointments = appointments.filter(appointment => {
                return (appointment.status === 0);
            });
            this.PastAppointments = appointments.filter(appointment => {
              return (appointment.status === 1);
          });
        }
    );
  }

  loadSpecialites(){
    this.doctorService.getAllSpecialities().subscribe(
      (data: Speciality[]) => {
        this.specialities = data;
      },
      (error) => {
        console.log('Error fetching specialities: ', error);
      }
    );
  }

  loadDoctors(specialityId: number){
    this.doctorService.getDoctorBySpeciality(specialityId).subscribe(
      (data: Doctor[]) => {
        this.doctors = data;
      },
      (error) => {
        console.log('Error fetching specialities: ', error);
      }
    );
  }

  onSpecialityChange(selectedSpecialityId: number) {
    const selectedSpeciality = this.specialities.find(speciality => speciality.id === selectedSpecialityId);
    if (selectedSpeciality) {
      this.appointment.specialityid = selectedSpeciality.id;
    }
    this.loadDoctors(this.appointment.specialityid);
  }

  onDoctorChange(selectedDoctorId: number) {
    const selectedDoctor = this.doctors.find(doctor => doctor.id === selectedDoctorId);
    if (selectedDoctor) {
      this.appointment.doctorid = selectedDoctor.id;
      this.appointment.amountPayable = selectedDoctor.fee;
    }
  }

  getAvailableDoctorTimes(doctorId: number, date: Date){debugger
    const endpoint = `/api/Appointments/getTimes/${doctorId}/${date}`;
    this.apiService.get<Time>(endpoint)
      .subscribe(times => {
        if(times.length == 0){
          this.messageService.add({ severity: 'error', summary: 'Select another date', detail: 'Doctor not available on selected date', life: 3000 });  
        }
        this.availableTimes = times;
      });
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

  openUpdateModal(content: TemplateRef<any>, appointment: any) {
    this.notesbtnclicked = false;
    this.appointment = appointment;
		this.modalService.open(content);
	} 

  openNotes(content: TemplateRef<any>, appointment: any) {
    this.notesbtnclicked = true;
    this.appointment = appointment;
		this.modalService.open(content);
	} 

  updateAppointment(appointment: any){
    this.appointmentService.editAppointment(appointment).subscribe((res) => {
      if(res){
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Appointment updated', life: 3000 });
        this.loadTable(this.patientId);
        this.modalService.dismissAll();
      }
    })
  }
}
