import { dispatch } from 'rxjs/internal/observable/pairs';
import { CoursesHttpService } from './services/courses-http.service';
import { loadAllCourses, allCoursesLoaded } from './course.actions';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { concatMap, map } from 'rxjs/operators';
import { CourseActions } from './action-types';

@Injectable()
export class CourseEffects {
  loadCourses$ = createEffect(
    () => this.actions$
    .pipe(
      ofType(CourseActions.loadAllCourses),
      // Ensures that we only send one request to the backend at a time.
      concatMap(action =>
        this.coursesHttpService.findAllCourses()),
        map(courses => allCoursesLoaded({courses}))
    )
  );

  saveCourses$ = createEffect(
    () => this.actions$
    .pipe(
      ofType(CourseActions.courseUpdated),
      concatMap(action =>
        this.coursesHttpService.saveCourse(
          action.update.id,
          action.update.changes
        ))
    ),
    {dispatch: false}
  );

  constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService){}
}
