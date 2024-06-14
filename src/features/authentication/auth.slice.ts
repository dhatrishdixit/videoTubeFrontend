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
     // console.log(action)
      state.authStatus = true;
      state.userData = action.payload;
    },
    // updateUserData: (state,action:PayloadAction<{
    //   email?:string,
    //   fullName?:string,   
    // }>) => {
    //   state.authStatus = true;
    //   if(action.payload.email){
    //     state.userData.email = action.payload.email;
    //   }
    //   if(action.payload.fullName){
    //     state.userData.fullName = action.payload.fullName;
    //   }
    // },
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
//Think of adding other actions like update 


export const { logIn, logOut,updateUserData } = authSlice.actions;

export default authSlice.reducer;
