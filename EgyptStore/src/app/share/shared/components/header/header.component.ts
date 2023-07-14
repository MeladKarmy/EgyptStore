import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { IProudct } from 'src/app/proudcts/proudcts/interface/proudctInterface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  proudctsFav: IProudct[]
  ngOnInit(): void {
    this.proudctsFav = JSON.parse(localStorage.getItem('fav')!)

  }
  drop(event: CdkDragDrop<string[]>) {
    let fav = moveItemInArray(this.proudctsFav, event.previousIndex, event.currentIndex);
  }

}

