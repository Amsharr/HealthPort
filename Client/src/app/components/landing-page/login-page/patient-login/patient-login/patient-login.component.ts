import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.scss'
})
export class PatientLoginComponent {

  username: string = '';
  password: string = '';
  loading: boolean = false;

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.loading = true;

    this.http.post<any>(this.baseApiUrl + '/api/Patients/login', loginData)
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        response => {
          this.router.navigate(['/homepage']);
        }
      );
  }

  private handleError(error: HttpErrorResponse) {
    // Handle error response
    console.error('Login failed:', error);
    // Display error message to the user or perform other actions as needed
    return throwError('Something went wrong. Please try again later.');
  }
}

