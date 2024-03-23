import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.scss',
  providers: [MessageService],
})
export class PatientLoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  baseApiUrl: string = environment.baseApiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  onSubmit() {debugger
    const loginData = {
      username: this.username,
      password: this.password,
    };

    this.loading = true;

    this.http
      .post<any>(this.baseApiUrl + '/api/Patients/login', loginData)
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((response) => {debugger
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Message Content',
        });
        this.router.navigate(['/homepage']);
      });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Login failed:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}
