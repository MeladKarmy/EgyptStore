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


  ], exports: [
    HeaderComponent,
    FooterComponent,
    ScrolComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CdkAccordionModule,
    MatCardModule,
    MatButtonModule,
    DragDropModule,
    DataViewModule,
    DataViewLayoutOptions

  ]
})
export class SharedModule { }
