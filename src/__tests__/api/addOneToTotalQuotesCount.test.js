import addOneToTotalQuotesCount from "../../api/addOneToTotalQuotesCount";
import { totalCountFetchSucceeded } from "../../reducers/totalCountSlice";

//mocks
jest.mock("../../api/getTotalQuotesCount");
jest.mock("../../api/helpers/sendFaunaDbQuery");
import getTotalQuotesCount from "../../api/getTotalQuotesCount";
import sendFaunaDbQuery from "../../api/helpers/sendFaunaDbQuery";

const dispatch = jest.fn();
console.error = jest.fn();

//Clear the mocks
beforeEach(jest.clearAllMocks);

describe("addOneToTotalQuotesCount", () => {
  it("Fetches count and dispatches the correct action", async () => {
    const mockInitialCount = 20;
    getTotalQuotesCount.mockImplementationOnce(() =>
      Promise.resolve(mockInitialCount)
    );
    sendFaunaDbQuery.mockImplementationOnce(() =>
      Promise.resolve({
        data: { updateTotalFetchCount: { count: mockInitialCount + 1 } }
      })
    );

    await addOneToTotalQuotesCount(dispatch);
    expect.assertions(4);
    [getTotalQuotesCount, sendFaunaDbQuery, dispatch].forEach(mock => {
      expect(mock).toHaveBeenCalledTimes(1);
    });
    expect(dispatch).toHaveBeenCalledWith(
      totalCountFetchSucceeded(mockInitialCount + 1)
    );
  });

  it("consoles error if we don't get a number from count and makes no dispatch", async () => {
    const mockError = { error: "error message" };
    getTotalQuotesCount.mockImplementationOnce(() =>
      Promise.resolve(mockError)
    );
    await addOneToTotalQuotesCount(dispatch);
    expect(console.error).toHaveBeenCalledWith(mockError);
    expect(dispatch).not.toHaveBeenCalled();
  });
  it("consoles error if we receive an error from the db request, makes no dispatch", async () => {
    getTotalQuotesCount.mockImplementationOnce(() => Promise.resolve(15));

    const mockResponse = { data: {}, errors: { error: "error message" } };

    sendFaunaDbQuery.mockImplementationOnce(() =>
      Promise.resolve(mockResponse)
    );
    await addOneToTotalQuotesCount(dispatch);
    expect(console.error).toHaveBeenCalledWith(mockResponse.errors);
    expect(dispatch).not.toHaveBeenCalled();
  });
});
