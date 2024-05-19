import { Component } from '@angular/core';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-medical-files',
  templateUrl: './medical-files.component.html',
  styleUrl: './medical-files.component.scss'
})
export class MedicalFilesComponent {
  files: any[] = [];

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.get<any>('/api/MedicalFiles/files').subscribe(data => {
      this.files = data;
    })
  }

  // downloadFile(fileId: number, fileName: string): void {
  //   this.apiService.downloadFile(fileId).subscribe(blob => {
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = fileName;
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);
  //   });
  // }
}
