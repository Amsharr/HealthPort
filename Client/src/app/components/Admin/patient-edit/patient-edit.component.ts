import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Patient } from '../../../Models/patient.model';
import { PatientsService } from '../../../services/patients.service';
import { SharedService } from '../../../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrl: './patient-edit.component.scss'
})
export class PatientEditComponent {
  
  patient: Patient = {
    id:0,
    firstName: '',
    lastName: '',
    dob: null ,
    nicNo: null,
    mobileNo:null,
    email: '',
    address: '',
    username: '',
    password: ''
  };

  subscription!: Subscription;

  constructor(
    private patientService: PatientsService,
    private shared : SharedService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.populateForm();
  }

  populateForm(){
    const storedPatientData = localStorage.getItem('patient');
    
    if (storedPatientData) {
      this.patient = JSON.parse(storedPatientData);
    } 
    else {
      if(this.subscription){
        this.subscription.unsubscribe();
      }
      this.subscription = this.shared.getSelectedPatient().subscribe(response => {
        if(response){
          this.patient = response;
          localStorage.setItem('patient', JSON.stringify(response));
        }
      });
    }
  }

  ngOnDestroy(): void{
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    localStorage.removeItem('patient');
  }

  update(patient: any){
    this.patientService.editPatient(patient).subscribe({
      next: () => {
        this.router.navigate(['/admin/patient-list']);
      },
      error: (response) => {
        console.log(response);
      }
    });;
    
  }
}
