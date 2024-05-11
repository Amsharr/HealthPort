import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppointmentsWidgetComponent } from './doctor-appointments-widget.component';

describe('DoctorAppointmentsWidgetComponent', () => {
  let component: DoctorAppointmentsWidgetComponent;
  let fixture: ComponentFixture<DoctorAppointmentsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorAppointmentsWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorAppointmentsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
