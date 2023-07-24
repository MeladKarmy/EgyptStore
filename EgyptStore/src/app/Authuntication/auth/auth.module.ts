import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/app/share/shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HandelReqestInterceptor } from './intercepter/handel-reqest.interceptor';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule

  ],
  providers:
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HandelReqestInterceptor,
        multi: true
      }
    ]

})
export class AuthModule { }
