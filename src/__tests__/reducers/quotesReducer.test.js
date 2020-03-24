import quotesReducer, {
  fetchQuoteRequested,
  fetchQuoteFailed,
  fetchQuoteSucceeded
} from "../../reducers/quotesSlice";

//mocking the max nr of quotes
jest.mock("../../config.js", () => ({ quotesLimitNr: 2 }));


const initialState = {
  loading: "idle",
  error: null,
  quotes: []
};

describe("quotesReducer", () => {
  it("Should return the initial state by default if no action is given", () => {
    expect(quotesReducer(initialState, { action: "none" })).toBe(initialState);
  });
  it("Should handle the fetch quote requested action", () => {
    expect(quotesReducer(initialState, fetchQuoteRequested())).toStrictEqual({
      ...initialState,
      loading: "loading"
    });
  });
  it("Should handle the fetch quote requested action", () => {
    const mockError = { error: "sample error" };
    expect(
      quotesReducer(initialState, fetchQuoteFailed(mockError))
    ).toStrictEqual({ ...initialState, error: mockError.error });
  });
  it("Should add a new quote on fetchQuoteSucceeded action", () => {
    expect(
      quotesReducer(
        initialState,
        fetchQuoteSucceeded({
          content: "sample quote",
          author: "sample author"
        })
      )
    ).toStrictEqual({
      ...initialState,
      quotes: [{ content: "sample quote", author: "sample author" }]
    });
  });

  it("Should add a new quote on fetchQuoteSucceeded action, deleting the oldest quote if the limit has been reached", () => {
    const quotesArr = [
      { content: "oldest content", author: "oldest author" },
      { content: "some content", author: "some author" },
      { content: "some content", author: "some author" }
    ];

    const resultState = quotesReducer(
      { ...initialState, quotes: quotesArr },
      fetchQuoteSucceeded({
        content: "sample quote",
        author: "sample author"
      })
    );

    expect(resultState.quotes.length).toBe(3);
    expect(resultState.quotes).not.toContainEqual(quotesArr[0]);
    expect(resultState.quotes[resultState.quotes.length - 1]).toStrictEqual({
      content: "sample quote",
      author: "sample author"
    });
  });

  it("Should add a new quote on fetchQuoteSucceeded action, but keeping the quotes array up to quotesLimitNr + 1", () => {

    const longQuotesArr = [
      { content: "some content", author: "some author" },
      { content: "some content", author: "some author" },
      { content: "some content", author: "some author" },
      { content: "some content", author: "some author" },
      { content: "some content", author: "some author" },
      { content: "some content", author: "some author" },
      { content: "some content", author: "some author" }
    ];

    const { quotes } = quotesReducer(
      { ...initialState, quotes: longQuotesArr },
      fetchQuoteSucceeded({ content: "new quote", author: "new author" })
    );
    expect(quotes).toHaveLength(3);
  });
});
