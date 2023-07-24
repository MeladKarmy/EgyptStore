import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProudctService } from '../../service/proudct.service';
import { IProudct } from '../../interface/proudctInterface';

@Component({
  selector: 'app-proudct-details',
  templateUrl: './proudct-details.component.html',
  styleUrls: ['./proudct-details.component.scss']
})
export class ProudctDetailsComponent {
  id: number
  value!: number
  proudct: any = {}
  err: string
  products: any = [
    '../../../../../assets/images/dress-shirt-img.png',
    '../../../../../assets/images/dress-shirt-img.png',
  ]
  constructor(
    private activateRout: ActivatedRoute,
    private productsService: ProudctService
  ) { }
  ngOnInit() {
    this.activateRout.paramMap.subscribe((params: ParamMap) => {
      let x: any = params.get('id')
      this.id = parseInt(x)
      this.productsService.getProudctById(this.id).subscribe({
        next: data => {
          this.proudct = data
        },
        error: err => this.err = err
      })
    })
  }

}

