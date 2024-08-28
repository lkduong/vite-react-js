import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthType, authService } from "../../services/authService";

export const loginThunk = createAsyncThunk(
  "login",
  async (username: string): Promise<AuthType> => {
    const loginRes = await authService.login(username);
    return loginRes;
  }
);
