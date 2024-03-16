import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { PatientsService } from '../../../services/patients.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent implements OnInit{
  patients: Patient[] = [];

  /**
   *
   */
  constructor(
    private patientsservice: PatientsService
    ) {
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
