import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileAdminComponent } from './my-profile-admin.component';

describe('MyProfileAdminComponent', () => {
  let component: MyProfileAdminComponent;
  let fixture: ComponentFixture<MyProfileAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyProfileAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProfileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
