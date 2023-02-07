import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { StorageService } from '@core/services/storage.service';
import { ValidationTokenService } from '@core/services/validation-token.service';
import { MasterService } from '@core/services/master.service';

@Injectable()
export default class ApiInterceptor implements HttpInterceptor {
  token: any;

  constructor(
    private ms: MasterService,
    private storage: StorageService,
    private validation: ValidationTokenService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('services')) {
      console.log('LT', request.url);
    }
    
    return next.handle(request);
    // this.getNetwork(request, next);
    // const promise = this.storage.getStorage('tokenCompany');
    // if (
    // request.url.includes('setting')  ||
    // request.url.includes('user/add/') ||
    // request.url.includes('assets') ||
    // request?.url.includes('master')) {
    //   console.log('NOT BEARER ', request.url);
    //   return next.handle(request);
    // }
    // this.validation.validate();
    // if (promise) {
    //   return from(promise).pipe(
    //     mergeMap((token) => {
    //       const newClone = this.addToken(request, token);
    //       return next.handle(newClone);
    //     })
    //   );
    // }
  }
  // private addToken(request: HttpRequest<any>, token: any) {
  //   if (token) {
  //     const clone: HttpRequest<any> = request.clone({
  //       setHeaders: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: 'Bearer ' + token
  //       }
  //     });
  //     return clone;
  //   }
  // }
}
