import React from "react";
import ActionButtonsContainer from "../../ui/ActionButtonsContainer";
import { cleanup, fireEvent, waitForElement } from "@testing-library/react";
import { renderWithRedux } from "../App.test";
import store from "../../store";

//mocking fetches
jest.mock("../../api/fetchRandomQuote");
import fetchRandomQuote from "../../api/fetchRandomQuote";
import { act } from "react-dom/test-utils";

//cleaning
afterEach(() => {
  cleanup();
  fetchRandomQuote.mockClear();
});

test("It increment the count index if the the next button is clicked and theres a next quote available", async () => {
  let index = 0;

  const { getByText } = renderWithRedux(
    <ActionButtonsContainer
      quotesIndex={index}
      quotes={[{ content: "sample" }, { content: "sample" }]}
      increaseQuotesIndex={jest.fn(() => {
        index++;
      })}
    />
  );

  const nextButton = getByText("Next Quote");

  act(() => {
    fireEvent.click(nextButton);
  });
  console.log(index);
  expect(index).toBe(1);
});
