import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { IUsers } from '../interfaces/users';
import { ILogin } from '../interfaces/login';
import { IRegister } from '../interfaces/register';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isLogin: boolean = false
  user: any = new BehaviorSubject(null)
  secretKey = 'MGHJGYUCGDFDETREGBXGSRESTRCHGIUYIUHFFDDTY'
  usersUrl = 'http://localhost:3030/Auth/signup/'
  log = 'http://localhost:3030/Auth/login'
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(user: FormData): Observable<string> {
    return this.http.post<string>(this.usersUrl, user).pipe(catchError((err) => {
      return throwError(() => err.error || "Server error")
    }))
  }
  login(user: ILogin): Observable<string> {
    return this.http.post<string>(this.log, user).pipe(catchError((err) => {
      return throwError(() => err.message || "Server error")
    }))
  }

  logout() {
    this.isLogin = false
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
  getDataJwtUser() {
    this.user.next(jwtDecode(JSON.parse(localStorage.getItem('token')!)))
    if (this.user) this.isLogin = true
    return this.user
  }

}
