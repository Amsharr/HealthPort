import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduleWidgetComponent } from './doctor-schedule-widget.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DoctorScheduleWidgetComponent', () => {
  let component: DoctorScheduleWidgetComponent;
  let fixture: ComponentFixture<DoctorScheduleWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorScheduleWidgetComponent],
      imports: [HttpClientTestingModule],
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
