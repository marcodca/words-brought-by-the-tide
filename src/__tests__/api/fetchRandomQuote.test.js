import fetchRandomQuote from "../../api/fetchRandomQuote";
import axiosMock from "axios";
import {
  fetchQuoteRequested,
  fetchQuoteFailed,
  fetchQuoteSucceeded
} from "../../reducers/quotesSlice";
import addOneToTotalQuotesCount from "../../api/addOneToTotalQuotesCount";

//mocks
const dispatch = jest.fn();
console.error = jest.fn();

//Clear the mocks
beforeEach(jest.clearAllMocks);

describe("fetchRandomQuote", () => {
  it("Fetches with axios and sends the correct dispatches", async () => {
    const mockResponse = {
      data: {
        content:
          "I am still far from being what I want to be, but with God's help I shall succeed.",
        originator: {
          name: "Vincent Van Gogh"
        }
      }
    };

    axiosMock.mockImplementationOnce(() => {
      return Promise.resolve(mockResponse);
    });

    await fetchRandomQuote(dispatch);

    //assertions
    expect.assertions(4);
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(fetchQuoteRequested());

    const {
      content,
      originator: { name }
    } = mockResponse.data;

    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      fetchQuoteSucceeded({ content, author: name })
    );
    expect(dispatch).toHaveBeenLastCalledWith(addOneToTotalQuotesCount);
  });

  it("Displays an error and dispatches the correct action if theres no data content and there is data message", async () => {
    const mockResponse = {
      data: {
        message: "No content"
      }
    };
    axiosMock.mockImplementationOnce(() => {
      return Promise.resolve(mockResponse);
    });

    await fetchRandomQuote(dispatch);
    expect.assertions(3);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenLastCalledWith(
      fetchQuoteFailed({ error: mockResponse.data.message })
    );
    expect(console.error).toHaveBeenCalledWith(
      new Error(mockResponse.data.message)
    );
  });

  it("Displays an error and dispatches the correct action if the fetch does not succeed", async () => {

    const error = { message: "random error" };

    axiosMock.mockImplementationOnce(() => {
      return Promise.reject(error);
    });

    await fetchRandomQuote(dispatch);
    expect.assertions(3);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenLastCalledWith(fetchQuoteFailed({error : error.message}));
    expect(console.error).toHaveBeenCalledWith(error);
  });
});
