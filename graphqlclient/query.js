import {useQuery} from "@apollo/react-hooks";
import {useGlobal} from "reactn";

export const useQueryData = (query) => {
  const [loadingQuery, setLoading] = useGlobal('loadingQuery');

  const {data, loadingStatus} = useQuery(query);
  if (loadingStatus !== loadingQuery) {
    setLoading(loadingStatus);
  }

  return data;
};

export const checkQueryHasLoadedWithData = queryResult => {
  return queryResult && queryResult.data && queryResult.loading === false;
};

export const checkQueryArrayNotEmpty = (queryResult, arrayName) => {
  return queryResult.data[arrayName].length > 0;
};

export const queryGetValue = (queryResult, value) => {
  return queryResult.data[value];
};
