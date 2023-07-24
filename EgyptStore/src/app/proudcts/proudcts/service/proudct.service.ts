import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { IProudct } from '../interface/proudctInterface';


@Injectable({
  providedIn: 'root'
})
export class ProudctService {
  cart: any = []
  private myFav: any = { counter: 12 };

  get state() {
    return this.myFav;
  }

  incrementCounter() {
    this.myFav.counter++;
  }
  ctag = 'http://localhost:3030/proud'
  pro = 'http://localhost:3030/proudcts'
  pro1 = 'http://localhost:3030/catagory'

  baseUrl = 'https://fakestoreapi.com/products'
  constructor(private http: HttpClient) { }
  getAllProudcts(): Observable<IProudct[]> {
    return this.http.get<any>(this.pro).pipe(catchError((err) => {
      return throwError(() => err.message || "Server error")
    }))

  }
  getCatag(): Observable<any> {
    return this.http.get<any>(this.pro1).pipe(catchError((err) => {
      return throwError(() => err.message || "Server error")
    }))

  }
  getProudctById(id: number): Observable<IProudct> {
    return this.http.get<any>(`${this.pro}/${id}`).pipe(catchError((err) => {
      return throwError(() => err.message || "Server error")
    }))
  }
  getCart(x: any) {
    this.cart.push(x)
    return this.cart

  }
  getlength() {
    return this.cart.length
  }
}
