import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// "_id": "65b7397d478eea2add5d9c5f",
// "username": "dhatrish3",
// "email": "dhatrish3@gmail.com",
// "fullName": "sample2",
// "avatar": "http://res.cloudinary.com/dviowskng/image/upload/v1706506620/hgzh6f8xblg57sosvhj6.png",
// "coverImage": "",
// "watchHistory": [],
// "createdAt": "2024-01-29T05:37:01.973Z"

type watchHistorySchema = {}; // complete this

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
      console.log(action)
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
