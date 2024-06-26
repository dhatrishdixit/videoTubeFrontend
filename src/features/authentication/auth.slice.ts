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
    watchHistory?: string[];
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
    watchHistory?: string[];
    createdAt?: Date;
}

export interface UpdateUserPayload {
  email?: string;
  fullName?: string;
  avatar?: string;
  coverImage?: string;
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
      state.authStatus = true;
      state.userData = action.payload;
    },
    updateUserData: (state,action:PayloadAction<UpdateUserPayload>)=>{
      state.authStatus = true;
      state.userData = {
        ...state.userData,
        ...action.payload
      }
    },
    logOut: (state) => {
      state.authStatus = false;
      state.userData = {};
    },
  },
});


export const { logIn, logOut,updateUserData } = authSlice.actions;

export default authSlice.reducer;
