import { createSlice } from "@reduxjs/toolkit";
import { incrementAsync } from "./action";

const home = createSlice({
  name: "home",
  initialState: {
    value: 0,
    loading: false,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(incrementAsync.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(incrementAsync.fulfilled, (state, { payload }) => ({
      ...state,
      loading: false,
      value: state.value + payload,
    }));
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = home.actions;

export default home.reducer;
