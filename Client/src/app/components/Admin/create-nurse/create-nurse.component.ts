import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Doctor } from "../../../Models/doctor.model";
import { Nurse } from "../../../Models/nurse.model";
import { DoctorService } from "../../../services/doctor.service";
import { NurseService } from "../../../services/nurse.service";


@Component({
  selector: 'app-create-nurse',
  templateUrl: './create-nurse.component.html',
  styleUrl: './create-nurse.component.scss'
})
export class CreateNurseComponent {
  nurseRegistration: Nurse = {
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
  submitBtnClicked: boolean = false;
  doctors: Doctor [] = [];
  constructor(
    private nurseService : NurseService,
    private router: Router,
    private messageService: MessageService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe(
      (response) => {
        this.doctors = response;
      }
    )
  }

  addNurse(){
    this.submitBtnClicked = true;
    if (
      (this.submitBtnClicked == true && this.nurseRegistration.firstName == '') ||
      (this.submitBtnClicked == true && this.nurseRegistration.lastName == '') ||
      (this.submitBtnClicked == true && this.nurseRegistration.dob == null) ||
      (this.submitBtnClicked == true && this.nurseRegistration.nicNo == null) ||
      (this.submitBtnClicked == true && this.nurseRegistration.mobileNo == null) ||
      (this.submitBtnClicked == true && this.nurseRegistration.email == '') ||
      (this.submitBtnClicked == true && this.nurseRegistration.address == '') ||
      (this.submitBtnClicked == true && this.nurseRegistration.username == '') ||
      (this.submitBtnClicked == true && this.nurseRegistration.password == '') ||
      (this.submitBtnClicked == true && this.nurseRegistration.doctorId == null)
    ){
      this.messageService.add({ severity: 'error', summary: 'Fill in required information', detail: 'Please enter all required fields', life: 2000 });  
      return;
    }else{
      this.nurseService.addNurse(this.nurseRegistration)
      .subscribe({
        next: () => {
          this.router.navigate(['/admin-dashboard']);
        }
      })
    }
  }
}
