import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DisplayUser } from "./models/DisplayUser.interface";
import { NewUser } from "./models/NewUser";
import { JWT } from "./models/Jwt";
import authService from "./services/auth.service";
import { RootState } from "../../store";
import { LoginUser } from "./models/LoginUser.interface";

// To make a futher rest api request to verify if user is authenicated
// or not by first check if the browser localstorage contain JWT or User

// This variable either store a string if user exist or null if not
const storedUser: string | null = localStorage.getItem("user");
const user: DisplayUser | null = !!storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem("jwt");
const jwt: JWT | null = !!storedJwt ? JSON.parse(storedJwt) : null;

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface AuthState extends AsyncState {
  user?: DisplayUser | null;
  jwt?: JWT;
  isAuthenticated?: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isAuthenticated: false,
  user: user,
  jwt: jwt,
};

// perform asynchronous operations such as making API to register createAsyncThunk
// function is used to create the register action creator. A string that is used to
// generate unique action types for the three actions that are dispatched by the
// register action creator. In this case, the string is "auth/register", which means
// that the action types will be "auth/register/pending", "auth/register/fulfilled",
// and "auth/register/rejected".
export const register = createAsyncThunk(
  "auth/register",
  // A user object of type NewUser that contains the data for the user being registered.
  // The thunkAPI object that provides some utilities to the callback function, including
  // dispatch, getState, and rejectWithValue.
  async (user: NewUser, thunkAPI) => {
    try {
      // Return a Display User object containing id, name, email
      return await authService.register(user);
    } catch (error) {
      // return a rejected promise with a custom error value
      return thunkAPI.rejectWithValue("Unable to register!");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginUser, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to login");
    }
  }
);

export const logout = createAsyncThunk("auth/logut", async () => {
  await authService.logout();
});

export const verifyJwt = createAsyncThunk(
  "auth/verify-jwt",
  async (jwt: string, thunkAPI) => {
    try {
      return await authService.verifyJwt(jwt);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to verify");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // define how the state should be updated in response to actions.
  // It takes the current state and the action as arguments, and
  // returns a new state.
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  // handle the actions dispatched by the register async thunk defined
  // The builder object is used to define how the state should be updated
  // in response to each of the three actions that can be dispatched by
  // the register async thunk: pending, fulfilled, and rejected
  extraReducers: (builder) => {
    builder
      // REGISTER
      // This action is dispatched by the register async thunk when the HTTP
      // request is initiated. This action indicates that the request is
      // currently pending, and can be used to update the state to reflect
      // that the request is in progress.
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      // This action is dispatched by the register async thunk when the HTTP
      // request is successful. This action indicates that the request has been
      // fulfilled, and can be used to update the state with the response data
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      // This action is dispatched by the register async thunk when the HTTP request
      // fails. This action indicates that the request has been rejected, and can be
      // used to update the state with an error message.
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jwt = action.payload.jwt;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthenticated = false;
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
        state.isAuthenticated = false;
      })
      //Verify JWT
      .addCase(verifyJwt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyJwt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = action.payload;
      })
      .addCase(verifyJwt.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
      });
  },
});

// Get the particular user
export const selectedUser = (state: RootState) => {
  return state.auth;
};

export const { reset } = authSlice.actions;
