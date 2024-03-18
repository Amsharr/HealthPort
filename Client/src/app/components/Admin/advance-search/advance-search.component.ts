import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrl: './advance-search.component.scss'
})
export class AdvanceSearchComponent implements OnInit {
  searchType:String = 'default'
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setSearchType();
  }
  private setSearchType(): void {
    const currentUrl: string = this.router.url;
    if (currentUrl.includes('patient-list')) {
      this.searchType = 'patient';
    }
    else if (currentUrl.includes('doctor-list'))
    {
      this.searchType = 'doctor';
    }
    else if (currentUrl.includes('nurse-list'))
    {
      this.searchType = 'nurse'
    }
    else if(currentUrl.includes('ward-list'))
    {
      this.searchType = 'ward'
    }
    else {
      this.searchType = 'default';
    }
  }
}
