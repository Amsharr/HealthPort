import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;
  
  constructor(
    private autheticationService: AuthenticationService,
    private router: Router
  ){}

  onSubmit() {
    this.autheticationService.login(this.username,this.password,'api/Admin/login')
    .subscribe((response) => {
      sessionStorage.setItem('username', response.username);
      this.router.navigate(['/admin-dashboard']);
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Login failed:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}
