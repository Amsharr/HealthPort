import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../../services/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrl: './doctor-login.component.scss'
})
export class DoctorLoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;
  loginBtnClicked: boolean = false;
  
  constructor(
    private autheticationService: AuthenticationService,
    private router: Router,
    private messageService: MessageService
  ){}

  onSubmit() {
    this.loginBtnClicked = true;
    if(this.loginBtnClicked && this.username == '' || this.loginBtnClicked && this.password == ''){
      this.messageService.add({ severity: 'error', summary: 'Fill in required information', detail: 'Please enter all required fields', life: 2000 });  
      return;
    }else{
    this.autheticationService.login(this.username,this.password,'api/Doctors/login')
    .subscribe((response) => {
      this.loginBtnClicked = false;
      sessionStorage.setItem('username', response.username);
      sessionStorage.setItem('doctorId', response.id)
      this.router.navigate(['/doctor/dashboard']);
    });
    }
  }
}
