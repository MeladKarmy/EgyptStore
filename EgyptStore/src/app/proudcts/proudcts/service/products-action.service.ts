import { Injectable } from '@angular/core';
import { IProudct } from '../interface/proudctInterface';
import { ProudctService } from './proudct.service';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductsActionService {
  // favourits = new BehaviorSubject<IProudct[]>([JSON.parse(localStorage.getItem('fav')!)])
  favourits: IProudct[] = []
  cart: IProudct[] = []


  constructor() {
    // ('fav' in localStorage) ? this.favourits = JSON.parse(localStorage.getItem('fav')!) : this.favourits = [] 

    this.favourits = JSON.parse(localStorage.getItem('fav')!)
    if (this.favourits == null) this.favourits = []
    this.cart = JSON.parse(localStorage.getItem('cart')!)
    if (this.cart == null) this.cart = []
  }
  productFav(event: IProudct) {
    if ('fav' in localStorage) {
      this.favourits = JSON.parse(localStorage.getItem('fav')!)
      let product = this.favourits.find((product: any) => product.proudctId == event.proudctId)
      if (product) {
        let newFav = this.favourits.filter((product: any) => product.proudctId !== event.proudctId)
        localStorage.setItem('fav', JSON.stringify(newFav))
      } else {
        this.favourits.push(event)
        localStorage.setItem('fav', JSON.stringify(this.favourits))
      }
    } else {
      this.favourits.push(event)
      localStorage.setItem('fav', JSON.stringify(this.favourits))
    }
  }

  productCart(event: IProudct) {
    if ('cart' in localStorage) {
      this.cart = JSON.parse(localStorage.getItem('cart')!)

      let product = this.cart.find((product: any) => product.proudctId == event.proudctId)
      if (product) {
        let newFav = this.cart.filter((product: any) => product.proudctId !== event.proudctId)
        localStorage.setItem('cart', JSON.stringify(newFav))
      } else {
        this.cart.push(event)
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    } else {
      this.cart.push(event)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }

  }
  // getProudcts() {
  //   this.productsService.getAllProudcts().subscribe({
  //     next: data => this.proudcts = data,
  //     error: err => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: err.error.msg,
  //       })
  //     }
  //   })
  // }



}
