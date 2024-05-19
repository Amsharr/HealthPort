import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatRegistrationComponent } from './pat-registration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PatRegistrationComponent', () => {
  let component: PatRegistrationComponent;
  let fixture: ComponentFixture<PatRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatRegistrationComponent],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
