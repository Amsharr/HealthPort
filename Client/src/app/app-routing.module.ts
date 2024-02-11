import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/Landing page/landing-page.component';
import { SelectUserComponent } from './components/landing-page/login-page/select-user/select-user/select-user.component';
import { PatientLoginComponent } from './components/landing-page/login-page/patient-login/patient-login/patient-login.component';
import { DoctorLoginComponent } from './components/landing-page/login-page/doctor-login/doctor-login/doctor-login.component';
import { NurseLoginComponent } from './components/landing-page/login-page/nurse-login/nurse-login.component';
import { AdminLoginComponent } from './components/landing-page/login-page/admin-login/admin-login.component';
import { PatRegistrationComponent } from './components/Patients/account/pat-registration/pat-registration.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
