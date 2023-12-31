import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrolComponent } from './components/scrol/scrol.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { BrowserModule } from '@angular/platform-browser';
import { PasswordModule } from 'primeng/password';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MatTabsModule } from '@angular/material/tabs';
import { AvatarModule } from 'primeng/avatar';
import { MatSelectModule } from '@angular/material/select';
import { ChipModule } from 'primeng/chip';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ScrolComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScrollTopModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatButtonModule,
    CdkAccordionModule,
    RouterModule,
    MatCardModule,
    DragDropModule,
    DataViewModule,
    PasswordModule,
    MatFormFieldModule,
    MatRadioModule,
    FileUploadModule,
    ToastModule,
    MatTabsModule,
    AvatarModule,
    MatSelectModule,
    ChipModule,
    CarouselModule,
    RatingModule

  ], exports: [
    HeaderComponent,
    FooterComponent,
    ScrolComponent,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CdkAccordionModule,
    MatCardModule,
    MatButtonModule,
    DragDropModule,
    DataViewModule,
    DataViewLayoutOptions,
    PasswordModule,
    MatFormFieldModule,
    MatRadioModule,
    FileUploadModule,
    ToastModule,
    MatTabsModule,
    AvatarModule,
    MatSelectModule,
    ChipModule,
    CarouselModule,
    RatingModule

  ]
})
export class SharedModule { }
