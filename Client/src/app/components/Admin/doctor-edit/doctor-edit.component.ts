import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { Speciality } from '../../../Models/speciality.model';
import { Doctor } from '../../../Models/doctor.model';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrl: './doctor-edit.component.scss'
})
export class DoctorEditComponent{
  specialities!: Speciality[];

  doctor: Doctor = {
    id: 0,
    firstName: '',
    lastName: '',
    specialityid: 0,
    dob: null,
    nicNo: null,
    mobileNo: null,
    email: '',
    address: '',
    username: '',
    password: '',
    fee:null
  }

  constructor(
    private doctorService: DoctorService,
    private dataService : DataService,
    private router : Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadSpecialities();
    //populate form
    this.dataService.populateForm<Doctor>('doctor').subscribe((doctor) => {
      this.doctor = doctor;
    });
  }

  loadSpecialities() {
    this.doctorService.getAllSpecialities().subscribe(
      (data: Speciality[]) => {
        this.specialities = data;
      },
      (error) => {
        console.log('Error fetching specialities: ', error);
      }
    );
  }

  onSpecialityChange(selectedSpecialityId: number) {

    const selectedSpeciality = this.specialities.find(speciality => speciality.id === selectedSpecialityId);

    if (selectedSpeciality) {
      this.doctor.specialityid = selectedSpeciality.id;
    }
  }

  updateDoctor(doctor:any){
    this.doctorService.editDoctor(doctor).subscribe({
      next: (response) => {
        localStorage.removeItem('doctor')
        this.router.navigate(['/admin/doctor-list']).then(() => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Successfully saved', detail: `Details of Doctor ${response.firstName} has been updated`, life: 3000 });
        }, 100);
        });
      },
      error: (response) => {
        console.log(response);
      }
    });;
  }
}

