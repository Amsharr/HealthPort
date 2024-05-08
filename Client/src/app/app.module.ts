import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { DropdownModule } from 'primeng/dropdown';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/landing-page/home/home.component';
import { PatientListComponent } from './components/Admin/patient-list/patient-list.component';
import { AdvanceSearchComponent } from './components/Admin/advance-search/advance-search.component';
import { SidePanelComponent } from './components/Admin/side-panel/side-panel.component';
import { DoctorListComponent } from './components/Admin/doctor-list/doctor-list.component';
import { CreatePatComponent } from './components/Admin/create-pat/create-pat.component';
import { CreateDocComponent } from './components/Admin/create-doc/create-doc.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesModule } from 'primeng/messages';
import { Toast, ToastModule } from 'primeng/toast';
import { CreateNurseComponent } from './components/Admin/create-nurse/create-nurse.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PatientEditComponent } from './components/Admin/patient-edit/patient-edit.component';
import { DoctorEditComponent } from './components/Admin/doctor-edit/doctor-edit.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { NurseListComponent } from './components/Admin/nurse-list/nurse-list.component';
import { NurseEditComponent } from './components/Admin/nurse-edit/nurse-edit.component';
import { MyProfileAdminComponent } from './components/Admin/account/my-profile-admin/my-profile-admin.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AppointmentComponent } from './components/Patients/appointment/appointment.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NurseDashboardComponent } from './components/nurse-dashboard/nurse-dashboard.component';
import { FileUploadModule } from 'primeng/fileupload';
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
    AdminDashboardComponent,
    HomeComponent,
    PatientListComponent,
    AdvanceSearchComponent,
    SidePanelComponent,
    DoctorListComponent,
    CreatePatComponent,
    CreateDocComponent,
    CreateNurseComponent,
    PatientEditComponent,
    DoctorEditComponent,
    NurseListComponent,
    NurseEditComponent,
    MyProfileAdminComponent,
    AppointmentComponent,
    NurseDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    CalendarModule,
    DropdownModule,
    BrowserAnimationsModule,
    MessagesModule,
    ToastModule,
    ConfirmPopupModule,
    NgbDropdownModule,
    RadioButtonModule,
    TableModule, 
    CommonModule,
    SplitterModule,
    TabsModule,
    FileUploadModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
