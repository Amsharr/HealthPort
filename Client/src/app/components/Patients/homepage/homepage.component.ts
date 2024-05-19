import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbDateStruct, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Speciality } from '../../../Models/speciality.model';
import { DoctorService } from '../../../services/doctor.service';
import { Appointments } from '../../../Models/appointment.model';
import { Doctor } from '../../../Models/doctor.model';
import { APIService } from '../../../services/api.service';
import { AppointmentsService } from '../../../services/appointments.service';
import { Time } from '@angular/common';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
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
    date : null,
    time : null,
    paymentMethod:'',
    paymentid : 1,
    paymentStatus:'',
    status:0,
    doctorNotes:null, 
    amountPayable:null
  }
  model: NgbDateStruct | undefined;
  private offcanvasService = inject(NgbOffcanvas);
  appointmentForm: any;
  patientFullName!: string;
  patientId!: number;
  submitButtonClicked: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private apiService: APIService,
    private appointmentService: AppointmentsService,
    private messageService: MessageService,
    private authenticationService: AuthenticationService
  ) {
    
  }
  ngOnInit(): void {
    this.loadSpecialites();
    this.patientFullName = sessionStorage.getItem('fullname') ?? '';

    this.appointment.patientName = this.patientFullName;
    this.appointment.patientId = +sessionStorage.getItem('patientId')! || 0;

    
  }

  showMsg(){
    this.messageService.add({ severity: 'error', summary: 'Fill in required information', detail: 'Please enter all required fields', life: 2000 });  
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

  getAvailableDoctorTimes(doctorId: number, date: Date){
    const endpoint = `/api/Appointments/getTimes/${doctorId}/${date}`;
    this.apiService.get<Time>(endpoint)
      .subscribe(times => {
        if(times.length == 0){
          this.messageService.add({ severity: 'error', summary: 'Select another date', detail: 'Doctor not available on selected date', life: 2000 });  
        }
        this.availableTimes = times;
      });
  }

	openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
  }
	
  submit(offcanvas: any){
    this.submitButtonClicked = true;
    if(this.submitButtonClicked && this.appointment.doctorid == 0 || this.submitButtonClicked && this.appointment.date == null || this.submitButtonClicked && this.appointment.time == null || this.submitButtonClicked && this.appointment.paymentMethod == ''){
      this.messageService.add({ severity: 'error', summary: 'Fill in required information', detail: 'Please enter all required fields', life: 2000 });  
      return;
    }else{
      this.submitButtonClicked = false;
      this.appointmentService.bookAppointment(this.appointment)
      .subscribe((appointment) =>{
        if(appointment){
          offcanvas.dismiss('Cross click');
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Your appointment(Id: ${appointment.id}) has been booked with Dr. ${appointment.doctorName} at ${appointment.time} on ${appointment.date}. Thank you for choosing HealthPort :)`, life: 3000 });
        }
      });
    }
  }

  closeOffcanvas(offcanvas: any) {
    offcanvas.dismiss('Cross click');
  }

}
