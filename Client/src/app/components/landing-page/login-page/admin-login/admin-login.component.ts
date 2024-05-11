import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;
  loginBtnClicked: boolean = false;
  
  constructor(
    private autheticationService: AuthenticationService,
    private messageService: MessageService,
    private router: Router
  ){}

  onSubmit() {
    this.loginBtnClicked = true;
    if(this.loginBtnClicked && this.username == '' || this.loginBtnClicked && this.password == ''){
      this.messageService.add({ severity: 'error', summary: 'Fill in required information', detail: 'Please enter all required fields', life: 2000 });  
      return;
    }else{
      this.loginBtnClicked = false;
      this.autheticationService.login(this.username,this.password,'api/Admin/login')
      .subscribe((response) => {
        sessionStorage.setItem('username', response.username);
        this.router.navigate(['/admin-dashboard']);
      });
    }
  }
}
