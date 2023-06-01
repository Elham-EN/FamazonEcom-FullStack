import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";

// This to subscribe to access the global state (One centralized location)
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

// This type represents the shape of the entire Redux store's state.
// store.getState: This is a Redux store method that returns the
// current state of the store. By defining and exporting the RootState
// type, you can use it in your React components or other parts of your
// application to ensure that your Redux state is correctly typed. This
// helps provide better type checking and autocompletion, making your
// development process more efficient and less error-prone.
export type RootState = ReturnType<typeof store.getState>;

// This type represents the dispatch function of your Redux store. It
// allows you to correctly type the dispatch method when working with
// Redux actions in your application
export type AppDispatch = typeof store.dispatch;
