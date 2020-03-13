import sendFaunaDbQuery from "./helpers/sendFaunaDbQuery";
import { totalCountFetchSucceeded } from "../reducers/totalCountSlice";

//Note: This function is meant to called it two ways, as a thunk to get an initial value of the totalFetch into the global state ( not  caring about it's return value), and as a regular function to return the current total fetch before adding one to it (to be called from the addOneToTotalQuotesCount), we use the (if resolve) to check what's the case. Tip: Remember!, to use the function as a thunk, you DON'T execute it when dispatching it   

const GET_TOTAL = `query{
    getTotalfetchCount{
      count
    }
  }`;

export default async dispatch => {
  const { data, errors } = await sendFaunaDbQuery(GET_TOTAL);

  if (errors) {
    console.error(errors);
    return;
  }

  if (dispatch) {
    dispatch(totalCountFetchSucceeded(data.getTotalfetchCount.count));
  }
  return data.getTotalfetchCount.count;
};
