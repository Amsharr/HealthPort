import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Nurse } from '../../../Models/nurse.model';
import { NurseService } from '../../../services/nurse.service';
import { DataService } from '../../../services/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nurse-edit',
  templateUrl: './nurse-edit.component.html',
  styleUrl: './nurse-edit.component.scss'
})
export class NurseEditComponent {
  nurse: Nurse = {
    id: 0,
    firstName: '',
    lastName: '',
    dob: null,
    nicNo: null,
    mobileNo: null,
    email: '',
    address: '',
    username: '',
    password: '',
    doctorId: null
  }

  constructor(
    private nurseService : NurseService,
    private router: Router,
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    //populate form
    this.dataService.populateForm<Nurse>('nurse').subscribe((response)=> {
      this.nurse = response;
    })    

  }

  submit(nurse: any){
    this.nurseService.editNurse(nurse).subscribe({
      next: (response) => {
        localStorage.removeItem('nurse')
        this.router.navigate(['/admin/nurse-list']).then(() => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Successfully saved', detail: `Details of Nurse ${response.firstName} has been updated`, life: 3000 });
        }, 100);
        });
      },
      error: (response) => {
        console.log(response);
      }
    });;
  }
}
