import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IProudct } from '../../interface/proudctInterface';
import { ProudctService } from '../../service/proudct.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-proudcts',
  templateUrl: './proudcts.component.html',
  styleUrls: ['./proudcts.component.scss']
})
export class ProudctsComponent {
  proudcts: IProudct[]
  err: string
  fav: IProudct[] = []
  constructor(private title: Title, private proudctsService: ProudctService) { }
  ngOnInit() {
    this.title.setTitle('Shop')
    this.getProudcts()
    this.proudctsService.getAllProudcts().subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    })
  }
  getProudcts() {
    this.proudctsService.getAllProudcts().subscribe({
      next: data => this.proudcts = data,
      error: err => this.err = err
    })
    console.log(this.proudcts)
  }
  productFav(event: IProudct) {
    if ('fav' in localStorage) {
      this.fav = JSON.parse(localStorage.getItem('fav')!)
      let product = this.fav.find(product => product.proudctId == event.proudctId)
      if (product) {
        let newFav = this.fav.filter(product => product.proudctId !== event.proudctId)
        localStorage.setItem('fav', JSON.stringify(newFav))
      } else {
        this.fav.push(event)
        localStorage.setItem('fav', JSON.stringify(this.fav))
      }
    } else {
      this.fav.push(event)
      localStorage.setItem('fav', JSON.stringify(this.fav))
    }
  }
}
