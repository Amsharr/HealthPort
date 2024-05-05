import { Component, TemplateRef, inject } from '@angular/core';
import { NgbDateStruct, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  model: NgbDateStruct | undefined;
  private offcanvasService = inject(NgbOffcanvas);

  constructor() {
    
  }

	openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
  }
	
  submit(){
    this
  }
}
