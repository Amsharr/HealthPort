import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceSearchComponent } from './advance-search.component';

describe('AdvanceSearchComponent', () => {
  let component: AdvanceSearchComponent;
  let fixture: ComponentFixture<AdvanceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvanceSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvanceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
