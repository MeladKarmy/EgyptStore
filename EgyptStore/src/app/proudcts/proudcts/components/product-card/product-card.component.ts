import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { fadeFavorite } from '../../animation/fadeFavorite';
import { IProudct } from '../../interface/proudctInterface';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [fadeFavorite]
})
export class ProductCardComponent {
  @Input() proudct: IProudct;
  @Output() oneFav = new EventEmitter()
  quntity: number;
  favorite: IProudct[] = []
  isFavorite: boolean = false
  addCart: boolean = false
  addQuntity: boolean = false
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getFvorite()

  }
  addToFavorite() {
    if (this.isFavorite) {
      this.isFavorite = false
      this.proudct.fav = false
    } else {
      this.isFavorite = true
      this.proudct.fav = true
    }
  }
  getFvorite() {
    this.favorite = JSON.parse(localStorage.getItem('fav')!)

  }
  addToCart() {
    if (this.quntity < 0) { this.addCart ? this.addCart = false : this.addCart = true }
  }
  addToQuntity() {
    this.addQuntity ? this.addQuntity = false : this.addQuntity = true
  }
  goToProudct(id: number) {
    this.router.navigate(['/singleProudct/' + id])
  }
  send() {
    this.oneFav.emit(this.proudct)
  }
}
