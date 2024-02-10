import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
menuType:String = 'default'
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setNavType();
  }

  private setNavType(): void {
    const currentUrl: string = this.router.url;
    if (currentUrl.includes('landing-page')) {
      this.menuType = 'landing-page';
    } else {
      this.menuType = 'default';
    }
  }
}
