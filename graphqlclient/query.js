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
