import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatAccountComponent } from './pat-account.component';

describe('PatAccountComponent', () => {
  let component: PatAccountComponent;
  let fixture: ComponentFixture<PatAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
