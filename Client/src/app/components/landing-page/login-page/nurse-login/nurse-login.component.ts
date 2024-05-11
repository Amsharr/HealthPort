import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nurse-login',
  templateUrl: './nurse-login.component.html',
  styleUrl: './nurse-login.component.scss'
})
export class NurseLoginComponent {
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
      this.autheticationService.login(this.username,this.password,'api/Nurses/login')
      .subscribe((response) => {
        this.loginBtnClicked = false;
        sessionStorage.setItem('username', response.username);
        sessionStorage.setItem('nurseId', response.id);
        this.router.navigate(['/nurse/dashboard']);
      });
    }
  }
}
