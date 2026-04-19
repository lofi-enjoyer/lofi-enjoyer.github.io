import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject, Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TestingGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const param = route.queryParams['testing'];
    if (param !== undefined) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
