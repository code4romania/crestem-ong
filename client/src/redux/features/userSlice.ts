import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../api/types";
import { userApi } from "../api/userApi";
import Cookies from "js-cookie";

interface IUserState {
  user: IUser | null;
  token: string | null;
  matrix: object | null;
}

const userToken = Cookies.get("jwt") || null;

const initialState: IUserState = {
  user: null,
  token: userToken,
  matrix: null,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logout: () => ({
      ...initialState,
      token: null,
    }),
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
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
