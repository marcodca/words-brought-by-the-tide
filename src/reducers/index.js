import { combineReducers } from "redux";
import countReducer from "../features/counter/counterSlice";
import quotesReducer from "../reducers/quotesSlice";

export default combineReducers({
  counter: countReducer,
  quotes: quotesReducer
});
