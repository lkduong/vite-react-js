import { createAsyncThunk } from "@reduxjs/toolkit";

export const incrementAsync = createAsyncThunk(
  "increase",
  async (count: number) => {
    return count;
  }
);
