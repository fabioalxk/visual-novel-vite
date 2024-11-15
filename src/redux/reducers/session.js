// src/redux/reducers/user.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const reducers = {
  setUsers: (state, action) => {
    state.list = action.payload;
  },
  addUser: (state, action) => {
    state.list.push(action.payload);
  },
  updateUser: (state, action) => {
    const index = state.list.findIndex((user) => user.id === action.payload.id);
    if (index !== -1) {
      state.list[index] = action.payload;
    }
  },
  deleteUser: (state, action) => {
    state.list = state.list.filter((user) => user.id !== action.payload);
  },
};

export const session = createSlice({
  name: "session",
  initialState,
  reducers,
});
