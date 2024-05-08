import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
  selector: 'app-nurse-login',
  templateUrl: './nurse-login.component.html',
  styleUrl: './nurse-login.component.scss'
})
export class NurseLoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;
  
  constructor(
    private autheticationService: AuthenticationService,
    private router: Router
  ){}

  onSubmit() {
    this.autheticationService.login(this.username,this.password,'api/Nurses/login')
    .subscribe((response) => {
      sessionStorage.setItem('username', response.username);
      sessionStorage.setItem('nurseId', response.id);
      this.router.navigate(['/nurse/dashboard']);
    });
  }
}
