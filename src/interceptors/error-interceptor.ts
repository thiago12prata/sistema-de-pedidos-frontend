import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("passou no interceptor");
    return next.handle(req).pipe(
      catchError(error => {
        console.log("Erro detectado pelo interceptor: ");
        let errorObj = error;
        if(!errorObj.error){
          errorObj = errorObj.console.error();
        }
        if(!errorObj.status){
          errorObj = JSON.parse(errorObj);
        }

        console.log(errorObj);
        return Observable.throw(errorObj)
      }
    ))as any;

  }
}
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
