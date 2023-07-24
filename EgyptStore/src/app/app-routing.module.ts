import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/components/home/home.component';
import { ContactComponent } from './main/components/contact/contact.component';
import { AboutComponent } from './main/components/about/about.component';
import { ProudctsComponent } from './proudcts/proudcts/components/proudcts/proudcts.component';
import { ProudctDetailsComponent } from './proudcts/proudcts/components/proudct-details/proudct-details.component';
import { RegisterComponent } from './Authuntication/auth/components/register/register.component';
import { LoginComponent } from './Authuntication/auth/components/login/login.component';
import { loginGuard } from './Authuntication/auth/guard/login.guard';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'proudcts', component: ProudctsComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [loginGuard] },
  { path: 'singleProudct/:id', component: ProudctDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
