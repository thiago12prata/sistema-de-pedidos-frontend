import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let localUser = this.storage.getLocalUser();

    let tamanhoUrl = API_CONFIG.baseUrl.length;
    let requestToAPI = req.url.substring(0, tamanhoUrl) == API_CONFIG.baseUrl;
    if(localUser && requestToAPI){
      const authReq = req.clone({headers: req.headers.set('Authorization' , 'Bearer ' + localUser.token)});
      return next.handle(authReq);
    }
    else{
      return next.handle(req);
    }
  }
}
export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
