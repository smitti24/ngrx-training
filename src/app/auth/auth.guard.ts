import { Router } from '@angular/router';
import { isLoggedIn } from './auth.selectors';
import { Injectable } from '@angular/core';
import {select, Store} from '@ngrx/store';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from 'app/reducers';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.store
    .pipe(
      select(isLoggedIn),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigateByUrl('/login');
        }
      })
    );

  }
}
