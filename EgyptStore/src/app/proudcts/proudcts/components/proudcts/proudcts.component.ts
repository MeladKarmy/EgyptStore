import { Component, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IProudct } from '../../interface/proudctInterface';
import { ProudctService } from '../../service/proudct.service';
import Swal from 'sweetalert2';
import { ProductsActionService } from '../../service/products-action.service';


@Component({
  selector: 'app-proudcts',
  templateUrl: './proudcts.component.html',
  styleUrls: ['./proudcts.component.scss']
})
export class ProudctsComponent {
  proudcts: IProudct[]
  err: string
  constructor(private title: Title, private proudctsService: ProudctService, private productsActionServise: ProductsActionService) { }
  ngOnInit() {
    this.title.setTitle('Shop')
    this.getProudcts()


  }
  getProudcts() {
    this.proudctsService.getAllProudcts().subscribe({
      next: data => this.proudcts = data,
      error: err => this.err = err
    })
  }

  productFav(event: IProudct) {
    this.productsActionServise.productFav(event)
  }
  productCart(event: IProudct) {
    this.productsActionServise.productCart(event)
  }
}





