import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  baseApiUrl: string = environment.baseApiUrl;
  
  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password,
    };

    this.loading = true;

    this.http
      .post<any>(this.baseApiUrl + '/api/Admin/login', loginData)
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((response) => {
        this.router.navigate(['/admin-dashboard']);
      });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Login failed:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}
