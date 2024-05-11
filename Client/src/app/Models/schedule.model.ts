import { Time } from "@angular/common";

export interface Schedules {
    id: number;
    doctorId: number;
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
}
  
  export enum DayOfWeek {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
  }
  