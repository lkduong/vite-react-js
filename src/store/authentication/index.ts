import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./action";
import { AuthType } from "../../services/authService";

export type Authentication = {
  auth: AuthType;
};

const initState: Authentication = {
  auth: {
    username: "",
    token: "",
  },
};

const authentication = createSlice({
  name: "authentication",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginThunk.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      auth: payload,
    }));
  },
});

export default authentication.reducer;
