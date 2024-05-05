import { Component, OnInit } from '@angular/core';
import { Nurse } from '../../../Models/nurse.model';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { NurseService } from '../../../services/nurse.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-nurse-list',
  templateUrl: './nurse-list.component.html',
  styleUrl: './nurse-list.component.scss'
})
export class NurseListComponent implements OnInit{
  nurses: Nurse[] = [];

  constructor(
    private nurseService: NurseService,
    private sharedService: SharedService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('doctor');
    localStorage.removeItem('nurse');
    this.receiveNursesData(this.nurses);
  }

  receiveNursesData(nurses: Nurse[]) {
    this.nurses = nurses; 
  }

  edit(nurse: Nurse): void {
    this.sharedService.setSelectedNurse(nurse);
    this.router.navigate(['/admin/nurse-edit']);
  }

  

  deleteNurse(nurseId: number) {
    this.nurseService.deleteNurseById(nurseId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
      },
      error: (response) => {
        console.error('Error deleting Nurse:', response);
      }
    });
  }

  confirmModal(event: Event, nurseId: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          this.deleteNurse(nurseId);   
          this.ngOnInit();         
        }
    });
  }
}
