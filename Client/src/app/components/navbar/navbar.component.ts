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
private offcanvasService = inject(NgbOffcanvas);
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setNavType();
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
    else {
      this.menuType = 'default';
    }
  }

  openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
  }
}
