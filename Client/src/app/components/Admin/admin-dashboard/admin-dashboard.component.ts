import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { PatientsService } from '../../../services/patients.service';
import { DoctorService } from '../../../services/doctor.service';
import { NurseService } from '../../../services/nurse.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{

  patientsCount: number = 0;
  doctorsCount: number = 0;
  nurseCount: number = 0;
  wardsCount: number = 0; 

  constructor(
    private patientsservice: PatientsService,
    private doctorService: DoctorService,
    private nurseService: NurseService
  ) {}

  ngOnInit(): void {
    this.getPatientsCount();
    this.getDoctorsCount();
    this.getNursesCount();
  }

  getPatientsCount(){
    this.patientsservice.getAllPatients().subscribe({
      next: (patients) => {
        this.patientsCount = patients.length;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  getDoctorsCount(){
    this.doctorService.getAllDoctors().subscribe({
      next:(doctors) => {
        this.doctorsCount = doctors.length;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  getNursesCount(){
    this.nurseService.getAllNurses().subscribe({
      next:(nurses) => {
        this.nurseCount = nurses.length;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
