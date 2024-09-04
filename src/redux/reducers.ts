import { UserState } from "../types/User";
import { SET_USERS, SET_FILTER } from "./actionTypes";

const initialState: UserState = {
  users: [],
  filters: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
};

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.field]: action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
