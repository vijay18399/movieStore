import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SecureInnerPagesGuard implements CanActivate {
  isLoggedIn!: boolean;
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    if (this.isLoggedIn) {
      // authorised so return true
      this.router.navigate(['']);
    }
    return true;
  }
}
