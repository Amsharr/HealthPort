import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseEditComponent } from './nurse-edit.component';

describe('NurseEditComponent', () => {
  let component: NurseEditComponent;
  let fixture: ComponentFixture<NurseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NurseEditComponent]
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
