import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/features/authentication/auth.slice";

export const store = configureStore({
  reducer: {
    authorization: authSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
