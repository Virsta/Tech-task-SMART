import { createStore } from "redux";
import userReducer from "./reducers";

const store = createStore(userReducer);

export type RootState = ReturnType<typeof store.getState>;
export default store;
