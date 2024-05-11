import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
  menuType:String = 'default';
    
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
      else if (currentUrl.includes('nurse'))
      {
        this.menuType = 'nurse'
      }
      else if (currentUrl.includes('doctor'))
      {
        this.menuType = 'doctor'
      }
      else {
        this.menuType = 'default';
      }
    }
}
