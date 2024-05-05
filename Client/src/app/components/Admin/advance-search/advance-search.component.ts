import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../../services/api.service';
import { Doctor } from '../../../Models/doctor.model';
import { Messages } from 'primeng/messages';
import { Patient } from '../../../Models/patient.model';
import { Speciality } from '../../../Models/speciality.model';
import { DoctorService } from '../../../services/doctor.service';
import { PatientsService } from '../../../services/patients.service';
import { NurseService } from '../../../services/nurse.service';
import { Nurse } from '../../../Models/nurse.model';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrl: './advance-search.component.scss'
})
export class AdvanceSearchComponent implements OnInit {

  @Output() doctors: EventEmitter<Doctor[]> = new EventEmitter<Doctor[]>();
  @Output() patients: EventEmitter<Patient[]> = new EventEmitter<Patient[]>();
  @Output() nurses: EventEmitter<Nurse[]> = new EventEmitter<Nurse[]>();

  
  filter: any = {};
  specialities: Speciality[] = [];
  searchType:String = 'default'

  constructor(
    private router: Router, 
    private apiService: APIService,
    private doctorService: DoctorService,
    private patientService: PatientsService,
    private nurseService: NurseService
  ) { }

  ngOnInit(): void {
    this.setSearchType();
    this.loadSpecialities();
    
    if(this.searchType == 'patient'){
      this.loadPatients();
    }

    if(this.searchType == 'doctor'){
      this.loadDoctors();
    }

    if(this.searchType == 'nurse'){
      this.loadNurses();
    }
  }
  private setSearchType(): void {
    const currentUrl: string = this.router.url;
    if (currentUrl.includes('patient-list')) {
      this.searchType = 'patient';
    }
    else if (currentUrl.includes('doctor-list'))
    {
      this.searchType = 'doctor';
    }
    else if (currentUrl.includes('nurse-list'))
    {
      this.searchType = 'nurse'
    }
    else if(currentUrl.includes('ward-list'))
    {
      this.searchType = 'ward'
    }
    else {
      this.searchType = 'default';
    }
  }

  search(){
    if(this.searchType =='patient'){
      this.searchPatients();
    }
    else if (this.searchType == 'doctor'){
      this.searchDoctors();
    }
    else if (this.searchType == 'nurse'){
      this.loadNurses();
    }
    else if (this.searchType == 'ward'){

    }
    else{
      this.searchDoctors();
    }
  }

  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe({
      next: (response) => {
        this.doctors.emit(response);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  loadPatients(){
    this.patientService.getAllPatients().subscribe({
      next: (response) => {
        this.patients.emit(response);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  searchDoctors() {
    if(this.filter == null){
      this.loadDoctors();
    }else{
      this.apiService.post<Doctor[]>('/api/doctors/search', this.filter).subscribe((response) =>{
        this.doctors.emit(response);
      }
      );
    }
  }

  searchPatients() {
    if(this.filter == null){
      this.loadPatients();
    }else{
      this.apiService.post<Patient[]>('/api/patients/search', this.filter).subscribe((response) =>{
        this.patients.emit(response);
      }
      );
    }
  }

  searchNurses(){
    if(this.filter == null){
      this.loadNurses();
    }else{
      this.apiService.post<Nurse[]>('/api/nurses/search', this.filter).subscribe((response) =>{
        this.nurses.emit(response);
      }
      );
    }
  }
  
  loadNurses(){
    this.nurseService.getAllNurses().subscribe({
      next: (response) => {
        this.nurses.emit(response);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }


  //speciality dropdown
  loadSpecialities() {
    this.doctorService.getAllSpecialities().subscribe(
      (data: Speciality[]) => {
        this.specialities = data;
      },
      (error) => {
        console.log('Error fetching specialities: ', error);
      }
    );
  }

  onSpecialityChange(selectedSpecialityId: number) {
    const selectedSpeciality = this.specialities.find(speciality => speciality.id === selectedSpecialityId);

    if (selectedSpeciality) {
      this.filter.specialityid = selectedSpeciality.id;
    }
  }
}
