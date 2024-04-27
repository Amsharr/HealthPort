import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../../../services/authentication.service';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.scss',
  providers: [MessageService],
})
export class PatientLoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  onSubmit() {
    this.authenticationService.login(this.username, this.password, '/api/Patients/login')
    .subscribe((response) => {
      this.router.navigate(['/homepage']);
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Login failed:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}
