import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../../../services/authentication.service';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.scss',
})
export class PatientLoginComponent {
  username: string = '';
  password: string = '';
  loginBtnClicked: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  onSubmit() {
    this.loginBtnClicked = true;
    if(this.loginBtnClicked && this.username == '' || this.loginBtnClicked && this.password == ''){
      this.messageService.add({ severity: 'error', summary: 'Fill in required information', detail: 'Please enter all required fields', life: 2000 });  
      return;
    }else{
      this.authenticationService.login(this.username,this.password,'api/Patients/login').subscribe((response) => {
      this.loginBtnClicked = false;
      sessionStorage.setItem('username', response.username);
      sessionStorage.setItem('patientId', response.id);
      sessionStorage.setItem('fullname', response.fullName);
      this.router.navigate(['/homepage']).then(() => {
        setTimeout(() => {
          this.authenticationService.showSuccessMessage();
      }, 100);
      });
    });
    }
    
  }
}
