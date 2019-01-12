import { createStore } from "redux";
import {userReducer} from "../reducers/userReducer";

export const store = createStore(userReducer);