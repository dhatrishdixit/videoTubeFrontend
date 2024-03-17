import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  authStatus: boolean;
  userData: {
    _id?: string;
    username?: string;
    email?: string;
    fullName?: string;
    avatar?: string;
    coverImage?: string;
    watchHistory?: string[]; // change watch history in backend to return all other types and update this type with array of objects
    createdAt?: Date;
  };
}

export interface UserState {
    _id?: string;
    username?: string;
    email?: string;
    fullName?: string;
    avatar?: string;
    coverImage?: string;
    watchHistory?: string[]; // change watch history in backend to return all other types and update this type with array of objects
    createdAt?: Date;
}

const initialState: AuthState = {
  authStatus: false,
  userData: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logIn: (state, action:PayloadAction<UserState>) => {
     // console.log(action)
      state.authStatus = true;
      state.userData = action.payload;
    },
    logOut: (state) => {
      state.authStatus = false;
      state.userData = {};
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
