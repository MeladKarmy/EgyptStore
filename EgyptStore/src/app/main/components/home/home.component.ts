import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private title: Title) { }
  ngOnInit(): void {
    this.title.setTitle('Home')
  }
  alertSweet() {
    Swal.fire('Success', 'Your operation was successful!', 'success');
  }
}
