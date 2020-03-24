import React from "react";
import MainContainer from "../../ui/MainContainer";
import { cleanup, fireEvent, waitForElement } from "@testing-library/react";
import { renderWithRedux } from "../App.test";

afterEach(cleanup);

//mocking the max nr of quotes
jest.mock("../../config.js", () => ({ defaultSecondsBetweenWaves: 1 }));

function waitTwoSeconds() {
  return new Promise(resolve => {
    console.log("promise");
    setTimeout(resolve, 3000);
  });
}

test("It displays initially the title", async () => {
  const { getByText } = renderWithRedux(<MainContainer />);
  const title = getByText("Words brought by the tide");
  expect(title).toHaveStyle(` display: block;`);
});
test("It does not display the title when a quote is being render", async () => {
  const { getByText, getByTestId } = renderWithRedux(<MainContainer />, {
    initialState: {
      quotes: {
        quotes: [{ content: "Sample content", author: "Sample author" }],
        loading: "idle"
      }
    }
  });
  await waitForElement(() => getByTestId("quote-display"));
  const title = getByText("Words brought by the tide");
  expect(title).toHaveStyle(` display: none;`);
});

test("It display the correct quote if there's is next one available in the quotes array when the next button is clicked ", async () => {
  const mockQuote = { content: "Sample content", author: "Sample author" };

  const { getByText, getByTestId } = renderWithRedux(<MainContainer />, {
    initialState: {
      quotes: {
        quotes: [mockQuote],
        loading: "idle"
      }
    }
  });

  const nextButton = getByText("Next Quote");
  fireEvent.click(nextButton);
  const { content, author } = mockQuote;
  expect(getByTestId("quote-display")).toHaveTextContent(`${content}${author}`);
});
