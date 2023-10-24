import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Matrix, User } from "../api/types";
import { userApi } from "../api/userApi";
import Cookies from "js-cookie";
import { RootState } from "@/redux/store";

interface UserState {
  user?: User;
  token?: string;
  matrix?: Matrix;
}

const userToken = Cookies.get("jwt") || undefined;

const initialState: UserState = {
  user: undefined,
  token: userToken,
  matrix: undefined,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logout: () => ({
      ...initialState,
      token: undefined,
    }),
    setUser: (state, action: PayloadAction<User>) => {
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

export const selectHasFinishedReports = (state: RootState) =>
  state.userState?.user?.reports?.some((report) => report.finished) ?? false;

export default userSlice.reducer;

export const { logout, setUser, setToken } = userSlice.actions;
