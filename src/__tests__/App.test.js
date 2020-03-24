import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, getByTitle, cleanup } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
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

afterEach(cleanup);

test("It renders with redux", () => {
  const { getByText } = renderWithRedux(<App />);
  expect(getByText("Words brought by the tide")).toBeInTheDocument();
});
