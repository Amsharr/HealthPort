import { Component } from '@angular/core';
import { Doctor } from '../../../Models/doctor.model';
import { DoctorService } from '../../../services/doctor.service';
import { Speciality } from '../../../Models/speciality.model';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss'
})
export class DoctorListComponent {
  doctors: Doctor[] = [];
  specialties!: Speciality[];

  constructor(
    private doctorService: DoctorService,
    private router : Router,
    private sharedService :  SharedService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
    ) {}

  ngOnInit(): void {
    localStorage.removeItem('doctor');
    localStorage.removeItem('patient');
    this.receiveDoctorsData(this.doctors);
    this.loadSpecialties();
  }

  receiveDoctorsData(doctors: Doctor[]) {
    this.doctors = doctors; 
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

  editDoctor(doctor: any){
    this.sharedService.setSelectedDoctor(doctor);
    this.router.navigate(['/admin/doctor-edit']);
  }

  deleteDoctor(doctorId: number){
    this.doctorService.deleteDoctorById(doctorId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
      },
      error: (response) => {
        console.error('Error deleting patient:', response);
      }
    });
  }

  confirmModal(event: Event, doctorId: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          this.deleteDoctor(doctorId);   
          this.ngOnInit();         
        }
    });
  }
}
