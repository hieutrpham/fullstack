import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import FilterMenu from "./FilterMenu";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, loading, refetch } = useRepositories();
  const navigate = useNavigate();
  if (loading) {
    return <Text>Loading...</Text>;
  }

  const repositoryNodes = data
    ? data.repositories.edges.map((e) => e.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ListHeaderComponent={<FilterMenu refetch={refetch} />}
    />
  );
};

export default RepositoryList;
