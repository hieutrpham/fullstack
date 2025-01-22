import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import FilterMenu from "./FilterMenu";
import SearchBar from "./SearchBar";
import React from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { refetch } = this.props;
    return (
      <View>
        <SearchBar refetch={refetch} />
        <FilterMenu refetch={refetch} />
      </View>
    );
  };

  render() {
    const { data, loading, navigate, onEndReached } = this.props;
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
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const { data, loading, fetchMore, refetch } = useRepositories({ first: 5 });

  const [localData, setLocalData] = React.useState(data);

  React.useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  const memoRefetch = React.useCallback(
    (variable) => refetch(variable),
    [refetch]
  );

  const navigate = useNavigate();

  const onEndReach = () => {
    console.log("end reached");
    fetchMore();
  };

  return (
    <RepositoryListContainer
      data={localData}
      loading={loading}
      refetch={memoRefetch}
      navigate={navigate}
      onEndReached={onEndReach}
    />
  );
};

export default RepositoryList;
