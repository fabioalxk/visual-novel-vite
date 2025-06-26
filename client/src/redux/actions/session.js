// src/redux/actions/userActions.js
import axios from "../../api";
import { session } from "../reducers/session";

export const { setUsers, addUser, updateUser, deleteUser } = session.actions;

export const fetchUsers = () => async (dispatch) => {
  try {
    console.log("fetching...");
    const response = await axios.get("/users");
    console.log("response11", response);
    dispatch(setUsers(response.data));
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

export const createUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("/users", userData);
    dispatch(addUser(response.data));
  } catch (error) {
    console.error("Failed to create user:", error);
  }
};

export const editUser = (id, userData) => async (dispatch) => {
  try {
    const response = await axios.put(`/users/${id}`, userData);
    dispatch(updateUser(response.data));
  } catch (error) {
    console.error("Failed to update user:", error);
  }
};

export const removeUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`/users/${id}`);
    dispatch(deleteUser(id));
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};
