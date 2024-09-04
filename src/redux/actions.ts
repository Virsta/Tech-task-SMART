import { User } from "../types/User";
import { SET_USERS, SET_FILTER } from "./actionTypes";

export const setUsers = (users: User[]) => ({
  type: SET_USERS,
  payload: users,
});

export const setFilter = (field: string, value: string) => ({
  type: SET_FILTER,
  payload: { field, value },
});
