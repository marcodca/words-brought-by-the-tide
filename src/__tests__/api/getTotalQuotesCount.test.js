import getTotalQuotesCount from "../../api/getTotalQuotesCount";
import { totalCountFetchSucceeded } from "../../reducers/totalCountSlice";

//mocks
jest.mock("../../api/helpers/sendFaunaDbQuery");
import sendFaunaDbQuery from "../../api/helpers/sendFaunaDbQuery";
const dispatch = jest.fn();
console.error = jest.fn();

//Clear the mocks
beforeEach(jest.clearAllMocks);

describe("getTotalQuotesCount", () => {
  it("Fetches the data and dispatches the correct action when called as a thunk", async () => {
    const mockResponse = { data: { getTotalfetchCount: { count: 25 } } };
    const { count } = mockResponse.data.getTotalfetchCount;

    sendFaunaDbQuery.mockImplementationOnce(() =>
      Promise.resolve(mockResponse)
    );

    const result = await getTotalQuotesCount(dispatch);
    expect.assertions(3);
    expect(sendFaunaDbQuery).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(totalCountFetchSucceeded(count));
    expect(result).toBe(count);
  });

  it("consoles error if we get any error field back in the query response, makes no dispatch, and returns the error", async () => {
    const mockResponse = { errors: "Invalid Key" };

    sendFaunaDbQuery.mockImplementationOnce(() =>
      Promise.resolve(mockResponse)
    );

    const result = await getTotalQuotesCount(dispatch);
    expect.assertions(3);
    expect(console.error).toHaveBeenCalledWith(mockResponse.errors);
    expect(dispatch).not.toHaveBeenCalled();
    expect(result).toBe(mockResponse.errors);
  });

  it("consoles error if the query fails, makes no dispatch, and returns the error", async () => {
    const mockResponse = { errors: "Fetching Error" };
    sendFaunaDbQuery.mockImplementationOnce(() => Promise.reject(mockResponse));
    const result = await getTotalQuotesCount(dispatch);
    expect.assertions(3);
    expect(console.error).toHaveBeenCalledWith(mockResponse);
    expect(dispatch).not.toHaveBeenCalled();
    expect(result).toBe(mockResponse);
  });
});
