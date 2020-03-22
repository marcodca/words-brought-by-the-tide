import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import QuotesDisplayContainer from "../components/QuotesDisplayContainer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

afterEach(cleanup);

//Initial mock state
const initialState = {
  quotes: {
    loading: "idle",
    error: null,
    quotes: [{ content: "testing", author: "The tester" }]
  }
};

test("<QuotesDisplayContainer/>", async () => {

  const mockStore = configureStore();
  const store = mockStore(initialState);

  const { debug, getByTestId } = render(
    <Provider store={store}>
      <QuotesDisplayContainer />
    </Provider>
  );

  const quotesDisplay = getByTestId("quote-display");

  //On the first render the placeholder should be displayed.
  expect(quotesDisplay.textContent).toBe("Words brought by the tide");

  //After waiting the needing time...
  await wait();

  //the content of the global state should be render.
  expect(quotesDisplay.textContent).toBe(initialState.quotes.quotes[0].content);

  // debug();
});

//Helper function for simulating the time waiting
function wait() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
}