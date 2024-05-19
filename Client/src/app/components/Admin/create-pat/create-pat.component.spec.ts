import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePatComponent } from './create-pat.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreatePatComponent', () => {
  let component: CreatePatComponent;
  let fixture: ComponentFixture<CreatePatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePatComponent],
      imports:[HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
