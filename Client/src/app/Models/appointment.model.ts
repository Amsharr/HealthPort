import { Time } from "@angular/common";

export interface Appointments{
id : number;
specialityid: number; 
patientName: string;
patientId : number;
doctorid : number;
doctorName: string;
date : Date | null;
time : Time | null;
paymentMethod: string;
paymentid : number;
paymentStatus:string;
status: number;
}