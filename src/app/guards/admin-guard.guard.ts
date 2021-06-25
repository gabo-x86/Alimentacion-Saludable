import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('user')!="undefined" || localStorage.getItem('user')!=null){
      if(JSON.parse(localStorage.getItem('user')).role == 'admin'){
        return true;
      }else return false;
    } return false;
  }
  
}
