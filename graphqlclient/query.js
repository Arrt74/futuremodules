import {useQuery} from "@apollo/react-hooks";
import {useGlobal} from "reactn";

export const useQueryData = (query) => {
  const [loading, setLoading] = useGlobal('loading');

  const {data, loadingStatus} = useQuery(query);
  if (loadingStatus !== loading) {
    setLoading(loadingStatus);
  }

  return data;
};
