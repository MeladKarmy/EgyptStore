import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HandelReqestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newReq = request.clone({
      headers: request.headers.append('authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')!))
    })

    return next.handle(newReq);
  }
}
