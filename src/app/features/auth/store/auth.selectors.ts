import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAllUsers = createSelector(
  selectAuthState,
  (state) => state.users
);

export const selectSuccessfulLogins = createSelector(selectAuthState, (state) =>
  state.loginHistory.filter((l) => l.status === 'success')
);

export const selectSelectedUser = createSelector(
  selectAuthState,
  (state) => state.selectedUser
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
