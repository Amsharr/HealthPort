import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNurseComponent } from './create-nurse.component';

describe('CreateNurseComponent', () => {
  let component: CreateNurseComponent;
  let fixture: ComponentFixture<CreateNurseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNurseComponent]
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
