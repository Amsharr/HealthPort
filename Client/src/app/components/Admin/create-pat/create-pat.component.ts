import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { PatientsService } from '../../../services/patients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-pat',
  templateUrl: './create-pat.component.html',
  styleUrl: './create-pat.component.scss'
})
export class CreatePatComponent implements OnInit{

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
        this.router.navigate(['/admin-dashboard']);
      }
    })
  }
}
