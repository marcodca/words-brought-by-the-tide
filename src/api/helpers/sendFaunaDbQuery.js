import axios from 'axios';

export default async (query, variables) => {
  const response = await axios({ url : "https://graphql.fauna.com/graphql",
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.REACT_APP_FAUNADB_KEY}`
    },
      data: {
        query,
        variables
      }
  });

  return response.data;
};

