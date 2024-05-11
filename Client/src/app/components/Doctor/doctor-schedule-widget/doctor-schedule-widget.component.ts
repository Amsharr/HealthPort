import { Component, OnInit } from '@angular/core';
import { Schedules } from '../../../Models/schedule.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctor-schedule-widget',
  templateUrl: './doctor-schedule-widget.component.html',
  styleUrl: './doctor-schedule-widget.component.scss'
})
export class DoctorScheduleWidgetComponent implements OnInit{
  doctorId!: number;
  schedules: Schedules[] = [];
  days: { value: number, name: string }[] = [
    { value: 0, name: 'Sunday' },
    { value: 1, name: 'Monday' },
    { value: 2, name: 'Tuesday' },
    { value: 3, name: 'Wednesday' },
    { value: 4, name: 'Thursday' },
    { value: 5, name: 'Friday' },
    { value: 6, name: 'Saturday' }
  ];

  constructor(
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.doctorId = +sessionStorage.getItem('doctorId') ! || 0;
    this.loadTable();
  }

  loadTable(){
    this.doctorService.getScheduleByDoctorId(this.doctorId).subscribe(
      (response) => {
        this.schedules = response;
      }
    );
  }

  dayOfWeekAsString(dayIndex: number) {
    return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex] || '';
  }
}
