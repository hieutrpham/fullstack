import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from "./Text";
import { useParams } from "react-router-native";

const RepositoryView = () => {
  const { repoid } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: repoid },
  });

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>{error.message}</Text>;

  return <RepositoryItem item={data.repository} show={true} />;
};

export default RepositoryView;
