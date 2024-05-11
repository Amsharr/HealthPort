import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWardComponent } from './create-ward.component';

describe('CreateWardComponent', () => {
  let component: CreateWardComponent;
  let fixture: ComponentFixture<CreateWardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateWardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateWardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
