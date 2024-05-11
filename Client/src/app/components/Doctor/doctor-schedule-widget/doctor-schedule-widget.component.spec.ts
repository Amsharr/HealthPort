import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduleWidgetComponent } from './doctor-schedule-widget.component';

describe('DoctorScheduleWidgetComponent', () => {
  let component: DoctorScheduleWidgetComponent;
  let fixture: ComponentFixture<DoctorScheduleWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorScheduleWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorScheduleWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
