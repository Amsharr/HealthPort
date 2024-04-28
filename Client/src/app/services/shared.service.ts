import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../Models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private selectedPatientSubject: BehaviorSubject<Patient | null> = new BehaviorSubject<Patient | null>(null);
  public selectedPatient$: Observable<Patient | null> = this.selectedPatientSubject.asObservable();

  constructor() { }

  //holds the patient details until it is used in the component
  setSelectedPatient(patient: Patient): void {
    this.selectedPatientSubject.next(patient);
  }

  //used to get the patient details
  getSelectedPatient(): Observable<Patient | null> {
    return this.selectedPatient$;
  }
}
