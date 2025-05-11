import { createReducer, on } from '@ngrx/store';
import {
  registerUser,
  logLogin,
  loadUsersSuccess,
  loadLoginLogsSuccess,
  loadUserByIdSuccess,
  deleteUserByIdSuccess,
  userActionFailure,
  updateUserSuccess,
  updateUserFailure,
} from './auth.actions';
import { User } from 'src/app/core/interfaces/user.model';
import { LoginHistory } from 'src/app/core/interfaces/login-history.model';

export interface AuthState {
  users: User[];
  selectedUser: User | null;
  loginHistory: LoginHistory[];
  error: string | null;
}

export const initialState: AuthState = {
  users: [],
  selectedUser: null,
  loginHistory: [],
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(registerUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),

  on(logLogin, (state, { login }) => ({
    ...state,
    loginHistory: [...state.loginHistory, login],
  })),

  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
  })),

  on(loadLoginLogsSuccess, (state, { logs }) => ({
    ...state,
    loginHistory: logs,
  })),

  on(loadUserByIdSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    error: null,
  })),
  on(deleteUserByIdSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
    error: null,
  })),
  on(userActionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)), // Update user in state
    error: null,
  })),
  on(updateUserFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
