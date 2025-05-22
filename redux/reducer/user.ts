import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
export const loadUserRequest = createAction("LoadUserRequest");
export const loadUserSuccess = createAction<any>("LoadUserSuccess"); // Replace `any` with your `User` type if available
export const loadUserFail = createAction<string>("LoadUserFail");

// State interface
interface UserState {
  isLoading: boolean;
  isChecked: boolean;
  isAuthenticated: boolean;
  user: any;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  isLoading: false,
  isChecked: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

// Reducer
export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUserRequest, (state) => {
      state.isLoading = true;
      state.isChecked = false;
    })
    .addCase(loadUserSuccess, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isChecked = true;
      state.user = action.payload;
      state.error = null;
    })
    .addCase(loadUserFail, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isChecked = true;
      state.user = null;
      state.error = action.payload;
    });
});
