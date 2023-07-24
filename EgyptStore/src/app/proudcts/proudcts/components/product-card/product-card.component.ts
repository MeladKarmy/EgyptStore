import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { fadeFavorite } from '../../animation/fadeFavorite';
import { IProudct } from '../../interface/proudctInterface';
import { ProductsActionService } from '../../service/products-action.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [fadeFavorite]
})
export class ProductCardComponent {
  @Input() proudct: IProudct;
  @Output() oneFav = new EventEmitter()
  @Output() oneCart = new EventEmitter()
  quntity: number;
  addCart: boolean = false
  addQuntity: boolean = false
  constructor(private router: Router, private productsActionService: ProductsActionService) { }

  ngOnInit(): void {
    this.getProudctsInFav()
  }
  addToFavorite() {
    this.proudct.fav ? this.proudct.fav = false : this.proudct.fav = true
  }
  getProudctsInFav() {
    if ('fav' in localStorage) {
      let x = JSON.parse(localStorage.getItem('fav')!)
      for (let i = 0; i < x.length; i++) {
        x[i].proudctId == this.proudct.proudctId ? this.proudct.fav = true : ''
      }

    }
  }
  addToCart() {
    this.quntity < 0 ? this.addCart = false : this.addCart = true
  }
  addToQuntity() {
    this.addQuntity ? this.addQuntity = false : this.addQuntity = true
    this.sendCart()
  }
  goToProudct(id: number) {
    this.router.navigate(['/singleProudct/' + id])
  }
  sendFav() {
    this.oneFav.emit(this.proudct)
  }
  sendCart() {
    this.oneCart.emit(this.proudct)
  }
}
