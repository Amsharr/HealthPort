import { Component } from '@angular/core';
import { Nurse } from '../../../Models/nurse.model';
import { NurseService } from '../../../services/nurse.service';
import { Router } from '@angular/router';

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
    password: ''
  }

  constructor(
    private nurseService : NurseService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
  }

  addNurse(){
    this.nurseService.addNurse(this.nurseRegistration)
    .subscribe({
      next: (nurse) => {
        this.router.navigate(['/admin-dashboard']);
      }
    })
  }
}
