import { combineReducers } from "redux";
import quotesReducer from "../reducers/quotesSlice";
import totalCountSlice from "../reducers/totalCountSlice";

export default combineReducers({
  quotes: quotesReducer,
  totalCount: totalCountSlice
});
