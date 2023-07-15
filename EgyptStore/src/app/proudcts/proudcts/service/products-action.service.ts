import { Injectable } from '@angular/core';
import { IProudct } from '../interface/proudctInterface';

@Injectable({
  providedIn: 'root'
})
export class ProductsActionService {

  constructor() { }
  favourits: IProudct[] = []
  cart: IProudct[] = []
  countCart: number = this.cart.length
  countFav: number = this.favourits.length
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
    console.log(this.cart)
    console.log(this.favourits)

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
    console.log(this.cart)
    console.log(this.favourits)
  }

}
