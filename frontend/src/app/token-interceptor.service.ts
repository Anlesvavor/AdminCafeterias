import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next){
    // console.log(this.injector.get(LoginService));
    // let loginService = this.injector.get(LoginService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer xxx.yy.zz`
      }
    });
    // let tokenizedReq = req.clone();
    // tokenizedReq.headers.authorization = `Bearer ${loginService.getToken()}`
    console.log(tokenizedReq)
    console.log(tokenizedReq.headers)
    return next.handle(tokenizedReq);
  }
}
