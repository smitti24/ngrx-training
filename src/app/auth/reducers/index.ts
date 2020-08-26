import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';

import {AuthActions} from '../action-types';
import { User } from '../model/user.model';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    };
  }),

  // Always returns a new copy of the state and never mutates the state
  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined
    }
  })
);

