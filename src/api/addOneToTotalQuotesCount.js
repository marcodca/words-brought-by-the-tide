import sendFaunaDbQuery from "./helpers/sendFaunaDbQuery";
import getTotalQuotesCount from "./getTotalQuotesCount";
import { totalCountFetchSucceeded } from "../reducers/totalCountSlice";

const ADD_ONE_TO_COUNT = `
    mutation($count: Int!) {
        updateTotalFetchCount(id: "259475654741852690", data : {count : $count}){
        count
        }
    }
  `;

export default async dispatch => {
  let count = await getTotalQuotesCount();
  count++;

  const { data, errors } = await sendFaunaDbQuery(ADD_ONE_TO_COUNT, { count });

  if (errors) {
    console.error(errors);
    return;
  }

  dispatch(totalCountFetchSucceeded(data.updateTotalFetchCount.count));
  return;
};
