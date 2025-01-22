import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, loading, error, fetchMore, refetch, ...result } = useQuery(
    GET_REPOSITORIES,
    { variables }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    data,
    loading,
    error,
    refetch,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
