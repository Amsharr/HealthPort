import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseApiUrl: string = environment.baseApiUrl;
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  login(username: string, password: string, endpoint: string) {
    this.loading = true;

    const loginData = {
      username: username,
      password: password,
    };

    return this.http
      .post<any>(`${this.baseApiUrl}/${endpoint}`, loginData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return throwError(error);
        }),
        finalize(() => {
          this.loading = false;
        })
      );
  }

  //error message to displayed if username or password is incorrect
  private handleError(error: HttpErrorResponse) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Incorrect password or username. Try again' });
  }

  showSuccessMessage() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful!', life:2000 });
  }
}
