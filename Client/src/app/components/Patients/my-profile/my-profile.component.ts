import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../../../Models/patient.model';
import { DataService } from '../../../services/data.service';
import { PatientsService } from '../../../services/patients.service';
import { MessageService } from 'primeng/api';

interface Bloodtype {
  name: string;
  code: string;
}

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit {
  bloodtypes: Bloodtype[] | undefined;


  patient: Patient = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: '',
    nationality:'',
    dob: null,
    nicNo: null,
    mobileNo: null,
    email: '',
    address: '',
    username: '',
    password: '',
    fullName:'',
    height:'',
    weigth:'',
    bloodtype:''
  }

  patientId: number = 0;

  constructor(
    private patientService: PatientsService,
    private messageService: MessageService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.patientId = +sessionStorage.getItem('patientId') ! || 0;    
   
    this.bloodtypes = [
      { name: 'A-', code: 'A-' },
      { name: 'A+', code: 'A+' },
      { name: 'B-', code: 'B-' },
      { name: 'B+', code: 'B+' },
      { name: 'AB-', code: 'AB-' },
      { name: 'AB+', code: 'AB+' },
      { name: 'O-', code: 'O-' },
      { name: 'O+', code: 'O+' },
    ];

    this.loadDetails();
  }

  loadDetails(){debugger
    this.patientService.getPatientById(this.patientId).subscribe(
      (response) => {
        this.patient = response[0];
      }
    )
  }

  updateDetails(patient: Patient){debugger
    this.patientService.editPatient(patient).subscribe(
      () => {
        this.router.navigate(['/homepage']).then(() => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Details Updated', life:2000 });
        }, 100);
        });
      }
    )
  }
}
