import totalCountReducer, {
  totalCountFetchSucceeded
} from "../../reducers/totalCountSlice";

const initialState = {
  count: null
};

//Please note that the increment of the total count is NOT handle in the global state, but instead directly done on the DB request and the re-fetched.

describe("totalCountReducer", () => {
  it("Should return the initial state when no valid action is provided", () => {
    expect(totalCountReducer(initialState, { action: "none" })).toMatchObject(
      initialState
    );
  });

  it("Should update the count to the state when the totalCountFetchSucceeded is provided", () => {
    expect(
      totalCountReducer(initialState, totalCountFetchSucceeded(34))
    ).toMatchObject({ count: 34 });
    expect(
      totalCountReducer(initialState, totalCountFetchSucceeded(12))
    ).toMatchObject({ count: 12 });
  });
});
