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

export const checkQueryHasLoadedWith = (queryResult, value) => {
  return queryResult && queryResult.data && queryResult.data[value] && queryResult.loading === false;
};

export const checkQueryArrayNotEmpty = (queryResult, arrayName) => {
  return queryResult.data[arrayName].length > 0;
};

export const queryGetValue = (queryResult, value) => {
  return queryResult.data[value];
};

export const checkQueryLoadedWithValueArray = (query) => {
  return !query.loading && query.data && query.data[Object.keys(query.data)[0]] && query.data[Object.keys(query.data)[0]].length > 0;
};

export const checkQueryLoadedWithValue = (query) => {
  return !query.loading && query.data && query.data[Object.keys(query.data)[0]];
};

export const getQueryLoadedWithValue = (query) => {
  return checkQueryLoadedWithValue(query) ? query.data[Object.keys(query.data)[0]] : null;
};

export const getQueryLoadedWithValueArrayNotEmpty = (query) => {
  return checkQueryLoadedWithValueArray(query) ? query.data[Object.keys(query.data)[0]] : null;
};

