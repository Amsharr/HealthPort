import { Component } from '@angular/core';
import { Doctor } from '../../../Models/doctor.model';
import { DoctorService } from '../../../services/doctor.service';
import { Speciality } from '../../../Models/speciality.model';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss'
})
export class DoctorListComponent {
  doctors: Doctor[] = [];
  specialties!: Speciality[];

  constructor(
    private doctorService: DoctorService
    ) {
  }

  ngOnInit(): void {
    this.loadDoctors();
    this.loadSpecialties();
  }

  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  loadSpecialties() {
    this.doctorService.getAllSpecialities().subscribe(specialties => {
        this.specialties = specialties;
    });
}

  getSpecialtyDescription(specialtyId: number): string {
    const specialty = this.specialties.find(spec => spec.id === specialtyId);
    return specialty ? specialty.description : 'Unknown';
}
}
