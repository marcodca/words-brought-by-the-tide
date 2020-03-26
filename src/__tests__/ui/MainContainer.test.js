import React from "react";
import MainContainer from "../../ui/MainContainer";
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

//mocking config not waiting all that much
jest.mock("../../config.js", () => ({
  defaultSecondsBetweenWaves: 1,
  quotesLimitNr: 5
}));

function waitOneSecond() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
}

//Tests
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

test("It display the correct quote if theres is a next one available in the quotes array when the next button is clicked ", async () => {
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

  act(() => {
    fireEvent.click(nextButton);
  });
  const { content, author } = mockQuote;
  expect(getByTestId("quote-display")).toHaveTextContent(`${content}${author}`);
});

test("It display the correct quote if theres is a next one available in the quotes array when the corresponding time is passed ", async () => {
  const mockQuotes = [
    {
      content: "Sample content mock one",
      author: "Sample author mock one"
    }
  ];

  const { getByTestId } = renderWithRedux(<MainContainer />, {
    initialState: {
      quotes: {
        quotes: mockQuotes,
        loading: "idle"
      }
    }
  });

  await act(async () => {
    await waitOneSecond();
  });

  expect(getByTestId("quote-display")).toHaveTextContent(
    `${mockQuotes[0].content}${mockQuotes[0].author}`
  );
});

test("It should fetch a new quote after waiting the corresponding time", async () => {
  renderWithRedux(<MainContainer />, {
    initialState: {
      quotes: {
        quotes: [],
        loading: "idle"
      }
    },
    store
  });

  await act( async () => {
    await waitOneSecond();
  });

  expect(fetchRandomQuote).toHaveBeenCalledTimes(1);
});
