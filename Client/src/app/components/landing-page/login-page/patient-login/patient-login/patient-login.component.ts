import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.scss'
})
export class PatientLoginComponent {

  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.loading = true;

    this.http.post<any>('https://localhost:7124/login', loginData)
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        response => {
          // Handle successful login response
          console.log('Login successful:', response);
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

