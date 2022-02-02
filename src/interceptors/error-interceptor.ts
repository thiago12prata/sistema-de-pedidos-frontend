import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        console.log("Erro detectado pelo interceptor: ");
        let errorObj = error;
        if(errorObj.error){
          errorObj = errorObj.error;
        }
        if(!errorObj.status && errorObj){
          errorObj = JSON.parse(errorObj);
        }

        console.log("Erro detectado pelo interceptor:");
        console.log(errorObj);


        switch(errorObj.status){
          case 403:
          this.handle403();
          break;
        }
        return Observable.throw(errorObj)
      }
    ))as any;
  }

  handle403(){
    this.storage.setLocalUser(null);
  }

}
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
