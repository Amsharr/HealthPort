import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../../Models/patient.model';
import { PatientsService } from '../../../../services/patients.service';
import { Router } from '@angular/router';

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

  constructor(
    private patientService : PatientsService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
  }

  addPatient(){
    this.patientService.addPatient(this.patientRegistration)
    .subscribe({
      next: (patient) => {
        this.router.navigate(['/homepage']);
      }
    })
  }
  
}
