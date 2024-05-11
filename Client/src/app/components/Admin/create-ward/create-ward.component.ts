import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { Doctor } from '../../../Models/doctor.model';
import { DoctorService } from '../../../services/doctor.service';
import { PatientsService } from '../../../services/patients.service';
import { WardRoom } from '../../../Models/wardRoom.model';
import { AdminService } from '../../../services/admin.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ward',
  templateUrl: './create-ward.component.html',
  styleUrl: './create-ward.component.scss'
})
export class CreateWardComponent implements OnInit{
  doctors: Doctor [] = [];
  patients: Patient [] = [];
  submitBtnClicked:boolean = false;

  ward: WardRoom = {
    id: 0,
    roomNumber: '',
    doctorId: 0,
    patientId:0
  }


  constructor(
    private doctorService: DoctorService,
    private patientService: PatientsService,
    private adminService: AdminService,
    private messageService: MessageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.loadPatients();
  }

  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe({
      next: (response) => {
        this.doctors = response;
      }
    });
  }

  loadPatients(){
    this.patientService.getAllPatients().subscribe({
      next: (response) => {
        this.patients = response;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  addWard(){
    this.submitBtnClicked = true;
    if(this.submitBtnClicked == true && this.ward.roomNumber == '' || this.submitBtnClicked == true && this.ward.doctorId == 0 || this.submitBtnClicked == true && this.ward.patientId == 0){
      this.messageService.add({ severity: 'error', summary: 'Fill in required information', detail: 'Please enter all required fields', life: 2000 });  
      return;
    }else{
      this.adminService.addWard(this.ward).subscribe(
        (response) =>{
          this.route.navigateByUrl('/admin-dashboard')
        }
      )
    }
  }

}
