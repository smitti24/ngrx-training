import {createSelector, createFeatureSelector} from '@ngrx/store';
import { AuthState } from './reducers';


export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Memorized function
// - Mapping function with memory.
export const isLoggedIn = createSelector(
  selectAuthState,
  // Projector function
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  // Projector function
  loggedIn => !loggedIn
);
