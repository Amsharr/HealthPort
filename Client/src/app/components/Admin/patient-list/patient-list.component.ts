import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { PatientsService } from '../../../services/patients.service';
import { SharedService } from '../../../services/shared.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.receivePatientsData(this.patients);
  }

  receivePatientsData(patients: Patient[]) {
    this.patients = patients; 
  }

  edit(patient: Patient): void {
    this.sharedService.setSelectedPatient(patient);
    this.router.navigate(['/admin/patient-edit']);
  }

  deletePatient(patientId: number) {
    this.patientService.deletePatientById(patientId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
      },
      error: (response) => {
        console.error('Error deleting patient:', response);
      }
    });
  }

  confirmModal(event: Event, patientId: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          this.deletePatient(patientId);   
          this.ngOnInit();         
        }
    });
  }
}
