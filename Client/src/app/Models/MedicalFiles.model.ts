export interface MedicalFiles {
    id: number;
    patientId: number;
    patientName: string;
    reportType: string;
    file: File | null;
    dateUploaded: Date | null;
    nurseId: number;
  }