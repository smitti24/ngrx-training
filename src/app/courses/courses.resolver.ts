import { loadAllCourses } from './course.actions';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap, first, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';

@Injectable()
export class CoursesResolver implements Resolve<any> {

  loading = false;

  constructor(private store: Store<AppState>) {

  }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
      return this.store
      .pipe(
        tap(() => {
          if (!this.loading) {
            this.store.dispatch(loadAllCourses());
            this.loading = true;
          }
        }),
        first(),
        // Waits for observable to emit a value, then it will complete the observable.
        // The router will know that the router transition can be completed
        finalize(() => this.loading = false)
      );
    }
}
