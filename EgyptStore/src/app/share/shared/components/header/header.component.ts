import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProudct } from 'src/app/proudcts/proudcts/interface/proudctInterface';
import { ProductsActionService } from 'src/app/proudcts/proudcts/service/products-action.service';
import { ProudctService } from 'src/app/proudcts/proudcts/service/proudct.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  proudctsFav: IProudct[]
  proudctsCart: IProudct[]
  constructor(
    private router: Router,
    private favService: ProudctService,
    public productsActionService: ProductsActionService) { }
  ngOnInit(): void {


  }
  drop(event: CdkDragDrop<string[]>) {

    let fav = moveItemInArray(this.productsActionService.favourits, event.previousIndex, event.currentIndex);
  }

  removeFromFav(index: number) {
    this.productsActionService.favourits.splice(index, 1)
    localStorage.setItem('fav', JSON.stringify(this.productsActionService.favourits))
  }
  goToProudct(index: number) {
    this.router.navigate(['singleProudct/' + this.proudctsCart[index].proudctId])
  }
  removeFromCart(index: number) {
    this.productsActionService.cart.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(this.productsActionService.cart))
  }
}

