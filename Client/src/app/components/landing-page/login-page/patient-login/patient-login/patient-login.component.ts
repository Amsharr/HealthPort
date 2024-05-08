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

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  onSubmit() {
    this.authenticationService.login(this.username,this.password,'api/Patients/login')
    .subscribe((response) => {
      sessionStorage.setItem('username', response.username);
      sessionStorage.setItem('patientId', response.id);
      sessionStorage.setItem('fullname', response.fullName);
      this.router.navigate(['/homepage']);
    });
  }
}
