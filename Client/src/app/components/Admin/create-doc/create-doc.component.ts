import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Speciality } from '../../../Models/speciality.model';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../Models/doctor.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-doc',
  templateUrl: './create-doc.component.html',
  styleUrl: './create-doc.component.scss'
})
export class CreateDocComponent implements OnInit {
  submitBtnClicked: boolean = false;
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
    password: '',
    fee:null
  }

  constructor(
    private doctorService : DoctorService,
    private router: Router,
    private messageService: MessageService
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
    this.submitBtnClicked = true;
    if(
      (this.submitBtnClicked == true && this.doctorRegistration.firstName == '') ||
      (this.submitBtnClicked == true && this.doctorRegistration.specialityid == 0) ||
      (this.submitBtnClicked == true && this.doctorRegistration.lastName == '') ||
      (this.submitBtnClicked == true && this.doctorRegistration.dob == null) ||
      (this.submitBtnClicked == true && this.doctorRegistration.nicNo == null) ||
      (this.submitBtnClicked == true && this.doctorRegistration.mobileNo == null) ||
      (this.submitBtnClicked == true && this.doctorRegistration.email == '') ||
      (this.submitBtnClicked == true && this.doctorRegistration.address == '') ||
      (this.submitBtnClicked == true && this.doctorRegistration.username == '') ||
      (this.submitBtnClicked == true && this.doctorRegistration.password == '')
    ){
      this.messageService.add({ severity: 'error', summary: 'Fill in required information', detail: 'Please enter all required fields', life: 2000 });  
      return;
    }else{
      this.doctorService.addDoctor(this.doctorRegistration)
      .subscribe({
        next: () => {
          this.router.navigate(['/admin-dashboard'])
        }
      })
    }
    
  }
  
}
