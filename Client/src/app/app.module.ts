import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './components/landing-page/Landing page/landing-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SelectUserComponent } from './components/landing-page/login-page/select-user/select-user/select-user.component';
import { PatientLoginComponent } from './components/landing-page/login-page/patient-login/patient-login/patient-login.component';
import { DoctorLoginComponent } from './components/landing-page/login-page/doctor-login/doctor-login/doctor-login.component';
import { NurseLoginComponent } from './components/landing-page/login-page/nurse-login/nurse-login.component';
import { AdminLoginComponent } from './components/landing-page/login-page/admin-login/admin-login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PatRegistrationComponent } from './components/Patients/account/pat-registration/pat-registration.component';
import { PatAccountComponent } from './components/Patients/account/pat-account/pat-account.component';
import { CalendarModule } from 'primeng/calendar';
import { FacilitiesComponent } from './components/landing-page/facilities/facilities.component';
import { AboutComponent } from './components/landing-page/about/about.component';
import { HomepageComponent } from './components/Patients/homepage/homepage.component';
import { BookAppointmentsComponent } from './components/appointments/book-appointments/book-appointments.component';
import { DropdownModule } from 'primeng/dropdown';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/landing-page/home/home.component';
import { PatientListComponent } from './components/Admin/patient-list/patient-list.component';
import { AdvanceSearchComponent } from './components/Admin/advance-search/advance-search.component';
import { SidePanelComponent } from './components/Admin/side-panel/side-panel.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    SelectUserComponent,
    PatientLoginComponent,
    DoctorLoginComponent,
    NurseLoginComponent,
    AdminLoginComponent,
    PatRegistrationComponent,
    PatAccountComponent,
    FacilitiesComponent,
    AboutComponent,
    HomepageComponent,
    BookAppointmentsComponent,
    AdminDashboardComponent,
    HomeComponent,
    PatientListComponent,
    AdvanceSearchComponent,
    SidePanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    CalendarModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
