import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Speciality } from '../../../Models/speciality.model';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../Models/doctor.model';

@Component({
  selector: 'app-create-doc',
  templateUrl: './create-doc.component.html',
  styleUrl: './create-doc.component.scss'
})
export class CreateDocComponent implements OnInit {

  specialities: Speciality[] = [];

  doctorRegistration: Doctor = {
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
    password: ''
  }

  constructor(
    private doctorService : DoctorService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.loadSpecialities();
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
      this.doctorRegistration.specialityid = selectedSpeciality.id;
    }
  }

  addDoctor(){
    this.doctorService.addDoctor(this.doctorRegistration)
    .subscribe({
      next: (doctor) => {
        this.router.navigate(['/admin/create-docaccount'])
      }
    })
  }
  
}
