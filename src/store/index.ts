import { configureStore } from "@reduxjs/toolkit";
import home from "./home";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authentication from "./authentication";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: {
    home,
    authentication,
  },
});
