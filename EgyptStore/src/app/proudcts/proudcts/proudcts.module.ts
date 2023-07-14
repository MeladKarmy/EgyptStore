import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProudctsRoutingModule } from './proudcts-routing.module';
import { ProudctsComponent } from './components/proudcts/proudcts.component';
import { ProudctDetailsComponent } from './components/proudct-details/proudct-details.component';
import { SharedModule } from 'src/app/share/shared/shared.module';
import { ProductCardComponent } from './components/product-card/product-card.component';


@NgModule({
  declarations: [
    ProudctsComponent,
    ProudctDetailsComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    ProudctsRoutingModule,
    SharedModule
  ],
  exports: []
})
export class ProudctsModule { }
