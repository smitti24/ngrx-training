import { loadAllCourses } from './course.actions';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { areCoursesLoaded } from './courses.selectors';

@Injectable()
export class CoursesResolver implements Resolve<any> {

  loading = false;

  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
      return this.store
      .pipe(
        select(areCoursesLoaded),
        tap((coursesLoaded) => {
          if (!this.loading && !coursesLoaded) {
            this.store.dispatch(loadAllCourses());
            this.loading = true;
          }
        }),
        filter(coursesLoaded => coursesLoaded),
        first(),
        // Waits for observable to emit a value, then it will complete the observable.
        // The router will know that the router transition can be completed
        finalize(() => this.loading = false)
      );
    }
}
