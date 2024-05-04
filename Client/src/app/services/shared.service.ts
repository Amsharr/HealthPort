import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../Models/patient.model';
import { Doctor } from '../Models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private selectedPatientSubject: BehaviorSubject<Patient | null> = new BehaviorSubject<Patient | null>(null);
  public selectedPatient$: Observable<Patient | null> = this.selectedPatientSubject.asObservable();

  private selectedDoctorSubject: BehaviorSubject<Doctor | null> = new BehaviorSubject<Doctor | null>(null);
  public selectedDoctor$: Observable<Doctor | null> = this.selectedDoctorSubject.asObservable();

  constructor() { }

  //holds the patient details until it is used in the component
  setSelectedPatient(patient: Patient): void {
    this.selectedPatientSubject.next(patient);
  }

  //used to get the patient details
  getSelectedPatient(): Observable<Patient | null> {
    return this.selectedPatient$;
  }

   //holds the patient details until it is used in the component
   setSelectedDoctor(doctor: Doctor): void {
    this.selectedDoctorSubject.next(doctor);
  }

  //used to get the Doctor details
  getSelectedDoctor(): Observable<Doctor | null> {
    return this.selectedDoctor$;
  }

  // Method to get selected data based on data type
  getSelectedData<T>(dataType: string): Observable<T | null> {
    switch (dataType) {
      case 'patient':
        return this.selectedPatient$ as Observable<T | null>;
      case 'doctor':
        return this.selectedDoctor$ as Observable<T | null>;
      default:
        throw new Error('Invalid data type');
    }
  }
}
