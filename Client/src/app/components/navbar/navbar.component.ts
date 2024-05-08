import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
menuType:String = 'default';
username: string = '';

private offcanvasService = inject(NgbOffcanvas);
  
constructor(private router: Router) { }

  ngOnInit(): void {
    this.setNavType();
    this.username = sessionStorage.getItem('username') ?? '';
  }

  logout(){
    this.router.navigate(['/landing-page']);
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('patientId');
    sessionStorage.removeItem('fullname', );
  }
  
  private setNavType(): void {
    const currentUrl: string = this.router.url;
    if (currentUrl.includes('landing-page')) {
      this.menuType = 'landing-page';
    }
    else if (currentUrl.includes('homepage'))
    {
      this.menuType = 'homepage';
    }
    else if (currentUrl.includes('admin'))
    {
      this.menuType = 'admin'
    }
    else if (currentUrl.includes('nurse'))
      {
        this.menuType = 'nurse'
      }
    else {
      this.menuType = 'default';
    }
  }
}
