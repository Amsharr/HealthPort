import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Appointments } from '../../../Models/appointment.model';
import { AppointmentsService } from '../../../services/appointments.service';
import { SharedService } from '../../../services/shared.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrl: './doctor-appointments.component.scss'
})
export class DoctorAppointmentsComponent implements OnInit{
  UpcomingAppointments:Appointments[] = [];
  PastAppointments:Appointments[] = [];
  doctorId: number = 0;
  private modalService = inject(NgbModal);
	closeResult = '';
  viewPatientBtnClicked:boolean = false;

  appointment: Appointments = {
    id : 0,
    specialityid: 0, 
    patientName: '',
    patientId : 0,
    doctorid : 0,
    doctorName: '',
    date : null,
    time : null,
    paymentMethod: '',
    paymentid : 0,
    paymentStatus: '',
    status: 0,
    doctorNotes: null,
    amountPayable:null
  }

  constructor(
    private appointmentService: AppointmentsService,
    private router : Router,
    private sharedService :  SharedService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.doctorId = +sessionStorage.getItem('doctorId') ! || 0;
    this.loadTable(this.doctorId);
  }

  loadTable(doctorId: number){
    this.appointmentService.getAppointmentsByDoctorId(doctorId).subscribe(
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

  open(content: TemplateRef<any>, appointment: Appointments) {
    this.appointment = appointment;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}
  openLg(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'lg' });
	}

  save(appointment: any){
    this.appointmentService.editAppointment(appointment).subscribe((res) => {
      if(res){
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Note added', life: 3000 });
        this.modalService.dismissAll();
      }
    })
  }

  completeAppointment(appointment: any){
    appointment.status = 1;
    this.appointmentService.editAppointment(appointment).subscribe((res) => {
      if(res){
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Appointment completed', life: 3000 });
        this.loadTable(this.doctorId);
      }
    })
  }

  confirmModal(event: Event, appointment: any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to complete this appointment?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {  
          this.completeAppointment(appointment)     
        }
    });
  }
}
