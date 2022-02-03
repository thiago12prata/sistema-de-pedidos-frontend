import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertController } from 'ionic-angular';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    public storage: StorageService,
    public alertCtrl: AlertController){}

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

        console.log(errorObj);


        switch(errorObj.status){
          case 401:
          this.handle401();
          break;

          case 403:
          this.handle403();
          break;

          default:
          this.handleDefaulError(errorObj);
        }
        return Observable.throw(errorObj)
      }
    ))as any;
  }

  handle403(){
    this.storage.setLocalUser(null);
  }

  handle401(){
    let alert = this.alertCtrl.create({
      message: 'Login ou senha incorretos',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present();
  }

  handleDefaulError(errorObj){
    let alert = this.alertCtrl.create({
      title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present();
  }
}
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
