import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IUsers } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersUrl = 'http://localhost:3030/users'
  constructor(private http: HttpClient) { }


  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.usersUrl, user).pipe(catchError((err) => {
      return throwError(() => err.message || "Server error")
    }))
  }
  getUser(user: any): Observable<any> {
    return this.http.get<any>(this.usersUrl).pipe(catchError((err) => {
      return throwError(() => err.message || "Server error")
    }))
  }
}
