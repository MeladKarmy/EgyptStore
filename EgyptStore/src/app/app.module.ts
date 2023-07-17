import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './share/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './main/main.module';
import { ProudctsModule } from './proudcts/proudcts/proudcts.module';
import { AuthModule } from './Authuntication/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MainModule,
    ProudctsModule,
    AuthModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
