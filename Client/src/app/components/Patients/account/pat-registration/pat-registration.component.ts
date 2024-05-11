import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../../Models/patient.model';
import { PatientsService } from '../../../../services/patients.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pat-registration',
  templateUrl: './pat-registration.component.html',
  styleUrl: './pat-registration.component.scss'
})
export class PatRegistrationComponent implements OnInit{

  patientRegistration: Patient = {
    id: 0,
    firstName: '',
    lastName: '',
    dob: null,
    nicNo: null,
    mobileNo: null,
    email: '',
    address: '',
    username: '',
    password: ''
  }
  submitBtnClicked:boolean = false;

  constructor(
    private patientService : PatientsService,
    private messageService: MessageService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
  }

  addPatient(){
    this.submitBtnClicked = true;
    if (
      (this.submitBtnClicked == true && this.patientRegistration.firstName == '') ||
      (this.submitBtnClicked == true && this.patientRegistration.lastName == '') ||
      (this.submitBtnClicked == true && this.patientRegistration.dob == null) ||
      (this.submitBtnClicked == true && this.patientRegistration.nicNo == null) ||
      (this.submitBtnClicked == true && this.patientRegistration.mobileNo == null) ||
      (this.submitBtnClicked == true && this.patientRegistration.email == '') ||
      (this.submitBtnClicked == true && this.patientRegistration.address == '') ||
      (this.submitBtnClicked == true && this.patientRegistration.username == '') ||
      (this.submitBtnClicked == true && this.patientRegistration.password == '')
    ){
      this.messageService.add({ severity: 'error', summary: 'Fill in required information', detail: 'Please enter all required fields', life: 2000 });  
      return;
    } else {
      this.patientService.addPatient(this.patientRegistration).subscribe({
        next: (patient) => {
          this.router.navigate(['/homepage']);
        },
      });
    }
    
  }
  
}
