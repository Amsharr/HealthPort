import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { PatientsService } from '../../../services/patients.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{

  patients: Patient[] = [];

  constructor(private patientsservice: PatientsService) {
    
  }

  ngOnInit(): void {
      this.patientsservice.getAllPatients()
      .subscribe({
        next: (patients) => {
          this.patients = patients;
        },
        error: (response) => {
          console.log(response);
        }
      });
  }
}
