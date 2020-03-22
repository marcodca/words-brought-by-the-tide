import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import rootReducer from "../reducers";
import App from "../App";

export function renderWithRedux(
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
}

it("renders with redux without crushing", () => {
  renderWithRedux(<App />);
});
