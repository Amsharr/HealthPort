import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardListComponent } from './ward-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WardListComponent', () => {
  let component: WardListComponent;
  let fixture: ComponentFixture<WardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WardListComponent],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
