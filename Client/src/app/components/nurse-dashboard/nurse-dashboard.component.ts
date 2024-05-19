import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Patient } from '../../Models/patient.model';
import { MessageService } from 'primeng/api';
import { NurseService } from '../../services/nurse.service';
import { APIService } from '../../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientsService } from '../../services/patients.service';

interface Bloodtype {
  name: string;
  code: string;
}
@Component({
  selector: 'app-nurse-dashboard',
  templateUrl: './nurse-dashboard.component.html',
  styleUrl: './nurse-dashboard.component.scss'
})
export class NurseDashboardComponent implements OnInit{
private modalService = inject(NgbModal);
bloodtypes: Bloodtype[] | undefined;

patients: Patient[]=[];
nurseId!: any;

patient: Patient = {
  id: 0,
  firstName: '',
  lastName: '',
  gender: '',
  nationality:'',
  dob: null,
  nicNo: null,
  mobileNo: null,
  email: '',
  address: '',
  username: '',
  password: '',
  fullName:'',
  height:'',
  weigth:'',
  bloodtype:''
}

  constructor(
    private messageService: MessageService, 
    private nurseService: NurseService,
    private patientService: PatientsService
  ) {}

  ngOnInit(): void {
    this.nurseId = +sessionStorage.getItem('nurseId') ! || 0;
    this.nurseService.getPatientsByNurseId(this.nurseId).subscribe((res)=>{
      this.patients = res;
    })

    this.bloodtypes = [
      { name: 'A-', code: 'A-' },
      { name: 'A+', code: 'A+' },
      { name: 'B-', code: 'B-' },
      { name: 'B+', code: 'B+' },
      { name: 'AB-', code: 'AB-' },
      { name: 'AB+', code: 'AB+' },
      { name: 'O-', code: 'O-' },
      { name: 'O+', code: 'O+' },
    ];
  } 

  onBasicUploadAuto(event: any, patient: any) {
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: 'File has successfully been uploaded'});
    const xhr = event.xhr;
    const formData = new FormData();
    const files = event.files;
    
    // Append the patientId to the form data
    formData.append('patientId', patient.id);
    formData.append('patientName', patient.patientName);
    formData.append('reportType', 'test type');
    formData.append('nurseId', this.nurseId);
    
    
    // Append the file(s) to the form data
    for (let i = 0; i < files.length; i++) {
      formData.append('file[]', files[i]);
    }
    
    xhr.send(formData);
    
  }

  open(content: TemplateRef<any>, patient: Patient) {
    this.patient = patient;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

  save(patient: any){
    this.patientService.editPatient(patient).subscribe({
      next: (patient) => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Details Added', life: 3000 });
        this.modalService.dismissAll();
      },
    });
  }
}
