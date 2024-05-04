import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/Landing page/landing-page.component';
import { SelectUserComponent } from './components/landing-page/login-page/select-user/select-user/select-user.component';
import { PatientLoginComponent } from './components/landing-page/login-page/patient-login/patient-login/patient-login.component';
import { DoctorLoginComponent } from './components/landing-page/login-page/doctor-login/doctor-login/doctor-login.component';
import { NurseLoginComponent } from './components/landing-page/login-page/nurse-login/nurse-login.component';
import { AdminLoginComponent } from './components/landing-page/login-page/admin-login/admin-login.component';
import { PatRegistrationComponent } from './components/Patients/account/pat-registration/pat-registration.component';
import { FacilitiesComponent } from './components/landing-page/facilities/facilities.component';
import { HomepageComponent } from './components/Patients/homepage/homepage.component';
import { BookAppointmentsComponent } from './components/appointments/book-appointments/book-appointments.component';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import { PatAccountComponent } from './components/Patients/account/pat-account/pat-account.component';
import { PatientListComponent } from './components/Admin/patient-list/patient-list.component';
import { CreatePatComponent } from './components/Admin/create-pat/create-pat.component';
import { CreateDocComponent } from './components/Admin/create-doc/create-doc.component';
import { CreateNurseComponent } from './components/Admin/create-nurse/create-nurse.component';
import { DoctorListComponent } from './components/Admin/doctor-list/doctor-list.component';
import { PatientEditComponent } from './components/Admin/patient-edit/patient-edit.component';
import { DoctorEditComponent } from './components/Admin/doctor-edit/doctor-edit.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'landing-page', 
    pathMatch: 'full' 
  }, 
  { 
    path: 'landing-page', 
    component: LandingPageComponent 
  },
  { 
    path:'landing-page/select-user', 
    component: SelectUserComponent
  },
  { path:'landing-page/patient-login',
    component: PatientLoginComponent
  },
  { path:'landing-page/doctor-login',
    component: DoctorLoginComponent
  },
  { path:'landing-page/nurse-login',
    component: NurseLoginComponent
  },
  { path:'landing-page/admin-login',
    component: AdminLoginComponent
  },
  { path:'landing-page/pat-registration',
    component: PatRegistrationComponent
  },
  { path:'landing-page/facilities',
    component: FacilitiesComponent
  },
  { path:'homepage',
    component: HomepageComponent
  },
  { path:'homepage/book-appointment',
    component: BookAppointmentsComponent
  },
  { path:'admin-dashboard',
    component: AdminDashboardComponent
  },
  { path:'homepage/account',
    component: PatAccountComponent
  },
  {
    path: 'admin/patient-list',
    component: PatientListComponent 
  },
  {
    path: 'admin/doctor-list',
    component: DoctorListComponent 
  },
  {
    path: 'admin/create-pataccount',
    component: CreatePatComponent
  },
  {
    path: 'admin/create-docaccount',
    component: CreateDocComponent
  },
  {
    path:'admin/create-nurse-account',
    component: CreateNurseComponent
  },
  {
    path:'admin/patient-edit',
    component: PatientEditComponent
  },
  {
    path:'admin/doctor-edit',
    component: DoctorEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
