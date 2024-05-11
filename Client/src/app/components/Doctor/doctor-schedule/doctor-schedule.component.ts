import { Component, Injectable, OnInit, TemplateRef, inject } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Schedules } from '../../../Models/schedule.model';
import { NgbModal, NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

const pad = (i: number): string => (i < 10 ? `0${i}` : `${i}`);

@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {
	fromModel(value: string | null): NgbTimeStruct | null {
		if (!value) {
			return null;
		}
		const split = value.split(':');
		return {
			hour: parseInt(split[0], 10),
			minute: parseInt(split[1], 10),
			second: parseInt(split[2], 10),
		};
	}

	toModel(time: NgbTimeStruct | null): string | null {
		return time != null ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}` : null;
	}
}

@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrl: './doctor-schedule.component.scss',
  providers: [{ provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter }],
})

export class DoctorScheduleComponent implements OnInit{
  private modalService = inject(NgbModal);
  addBtnClicked: boolean = false;
  updateBtnClicked:boolean = false;
  doctorId!: number;
  meridian = true;
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
  newSchedule: Schedules = {
    id: 0,
    doctorId: 0,
    dayOfWeek: 0,
    startTime: '',
    endTime: ''
  }

  constructor(
    private doctorService: DoctorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
  
  save(newSchedule: Schedules){
    newSchedule.doctorId = this.doctorId;
    const existingSchedule = this.schedules.find(s => s.dayOfWeek == newSchedule.dayOfWeek);

    if(newSchedule.startTime > newSchedule.endTime || newSchedule.startTime == newSchedule.endTime){
      this.messageService.add({ severity: 'error', summary: 'Cannot Save', detail: `The start time cannot be greater than the end time, or be the same ` });
      return;
    }

    if(existingSchedule){
      this.messageService.add({ severity: 'error', summary: 'Cannot Save', detail: `Schedule Already exists for ${this.dayOfWeekAsString(existingSchedule.dayOfWeek)} ` });
    }else{
      this.doctorService.addDoctorSchedule(newSchedule).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `Schedule created for ${this.dayOfWeekAsString(response.dayOfWeek)}` , life: 3000 });
          this.modalService.dismissAll();
          this.loadTable();
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Cannot Save', detail: `'Error while adding schedule:', ${error}` });
        }
      );
    }
  }

  deleteSchedule(scheduleId: number){
    this.doctorService.deleteScheduleById(scheduleId).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Deleted' , life: 1000 });
        this.loadTable();
      },
      (error) =>{
        this.messageService.add({ severity: 'error', summary: 'Cannot Delete', detail: `'Error while deleting schedule:', ${error}` });
      }
    )
  }

  updateSchedule(schedule: Schedules){
    if(schedule.startTime > schedule.endTime || schedule.startTime == schedule.endTime){
      this.messageService.add({ severity: 'error', summary: 'Cannot Save', detail: `The start time cannot be greater than the end time, or be the same ` , life: 1000 });
    }else{
      this.doctorService.editSchedule(schedule).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `Schedule updated for ${this.dayOfWeekAsString(response.dayOfWeek)}` , life: 3000 });
          this.loadTable();
          this.modalService.dismissAll();
        }
      )
    }
  }

  confirmModal(event: Event, scheduleId: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this Schedule?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          this.deleteSchedule(scheduleId);                    
        }
    });
  }

  openLg(content: TemplateRef<any>) {
    this.newSchedule = {
    id: 0,
    doctorId: 0,
    dayOfWeek: 0,
    startTime: '',
    endTime: ''
  };
    this.updateBtnClicked = false;
    this.addBtnClicked = true;
		this.modalService.open(content,{size: 'lg' });
	} 

  openUpdateModal(content: TemplateRef<any>, schedule: any) {
    this.updateBtnClicked = true;
    this.addBtnClicked = false;
    this.newSchedule = schedule;
		this.modalService.open(content,{size: 'lg' });
	} 

}
