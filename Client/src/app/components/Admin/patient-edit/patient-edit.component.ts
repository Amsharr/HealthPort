import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Patient } from '../../../Models/patient.model';
import { PatientsService } from '../../../services/patients.service';
import { SharedService } from '../../../services/shared.service';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrl: './patient-edit.component.scss'
})
export class PatientEditComponent implements OnInit{
  
  patient: Patient = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: '',
    nationality:'',
    dob: null,
    nicNo: null,
    mobileNo: null,
    email: '',
    address: '',
    username: '',
    password: '',
    fullName:'',
    height:'',
    weigth:'',
    bloodtype:''
  };

  subscription!: Subscription;

  constructor(
    private patientService: PatientsService,
    private dataService: DataService,
    private messageService: MessageService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.dataService.populateForm<Patient>('patient').subscribe((response) => {
      this.patient = response;
    });
  }

  ngOnDestroy(): void{
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    localStorage.removeItem('patient');
  }

  update(patient: any){
    this.patientService.editPatient(patient).subscribe({
      next: (response) => {
        localStorage.removeItem('patient')
        this.router.navigate(['/admin/patient-list']).then(() => {
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Successfully saved', detail: `Details of patient ${response.fullName} has been updated`, life: 3000 });
        }, 100);
        });
      },
      error: (response) => {
        console.log(response);
      }
    });;
  }
}
