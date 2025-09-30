// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./store/todoSlice.js";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;
