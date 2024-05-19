import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNurseComponent } from './create-nurse.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateNurseComponent', () => {
  let component: CreateNurseComponent;
  let fixture: ComponentFixture<CreateNurseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNurseComponent],
      imports:[HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
