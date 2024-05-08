import { Component, OnInit } from '@angular/core';
import { Patient } from '../../Models/patient.model';
import { MessageService } from 'primeng/api';
import { NurseService } from '../../services/nurse.service';
import { APIService } from '../../services/api.service';
import { MedicalFiles } from '../../Models/MedicalFiles.model';
import { UploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-nurse-dashboard',
  templateUrl: './nurse-dashboard.component.html',
  styleUrl: './nurse-dashboard.component.scss'
})
export class NurseDashboardComponent implements OnInit{
patients: Patient[]=[];
nurseId!: any;

  constructor(
    private messageService: MessageService, 
    private nurseService: NurseService,
    private apiService: APIService
  ) {}

  ngOnInit(): void {
    this.nurseId = +sessionStorage.getItem('nurseId') ! || 0;
    this.nurseService.getPatientsByNurseId(this.nurseId).subscribe((res)=>{
      this.patients = res;
    })
  } 

  onBasicUploadAuto(event: any, patient: any) {debugger
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
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

    // Send the request
    xhr.send(formData);
  }
}
