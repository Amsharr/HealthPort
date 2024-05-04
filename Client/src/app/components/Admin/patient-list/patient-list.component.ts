import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { PatientsService } from '../../../services/patients.service';
import { SharedService } from '../../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent implements OnInit{
  patients: Patient[] = [];

  constructor(
    private patientService: PatientsService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.displayAllPatients();
  }

  edit(patient: Patient): void {
    this.sharedService.setSelectedPatient(patient);
    this.router.navigate(['/admin/patient-edit']);
  }

  displayAllPatients(){
    this.patientService.getAllPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  deletePatient(patientId: number) {
    console.log('Deleting patient...');
    this.patientService.deletePatientById(patientId).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (response) => {
        console.error('Error deleting patient:', response);
      }
    });
  }
  

}
