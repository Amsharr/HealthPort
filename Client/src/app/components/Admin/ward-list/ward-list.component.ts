import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Patient } from '../../../Models/patient.model';
import { PatientsService } from '../../../services/patients.service';
import { SharedService } from '../../../services/shared.service';
import { AdminService } from '../../../services/admin.service';
import { WardRoom } from '../../../Models/wardRoom.model';

@Component({
  selector: 'app-ward-list',
  templateUrl: './ward-list.component.html',
  styleUrl: './ward-list.component.scss'
})
export class WardListComponent {
  wards: WardRoom[] = [];
  page: number = 1;
  pageSize: number = 5;

  constructor(
    private adminService: AdminService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(){
    this.adminService.getAllWards().subscribe(
      (response) => {
        this.wards = response;
      }
    )
  }


  edit(ward: WardRoom): void {
    this.adminService.editWard(ward).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Successfully saved', detail: `Ward room details updated for ward ${response.roomNumber}`, life: 3000 });
        this.loadTable();
      }
    )
  }

  deleteWard(id: number) {
    this.adminService.deleteWardById(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Ward room deleted', life: 3000 });
        this.loadTable();
      },
      error: (response) => {
        console.error('Error deleting patient:', response);
      }
    });
  }

  confirmModal(event: Event, wardId: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          this.deleteWard(wardId);
        }
    });
  }
}
