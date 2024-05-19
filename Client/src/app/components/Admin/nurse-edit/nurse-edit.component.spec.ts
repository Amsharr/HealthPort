import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseEditComponent } from './nurse-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PatientListComponent } from '../patient-list/patient-list.component';

describe('NurseEditComponent', () => {
  let component: NurseEditComponent;
  let fixture: ComponentFixture<NurseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientListComponent],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NurseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
