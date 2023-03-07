import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../api/types";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";

interface IUserState {
  user: IUser | null;
  token: string | null;
  matrix: object | null;
}

const initialState: IUserState = {
  user: null,
  token: null,
  matrix: null,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.jwt;
        state.user = payload.user;
      }
    ),
      builder.addMatcher(
        userApi.endpoints.getMatrix.matchFulfilled,
        (state, { payload }) => {
          state.matrix = payload;
        }
      );
  },
});

export default userSlice.reducer;

export const { logout, setUser, setToken } = userSlice.actions;
