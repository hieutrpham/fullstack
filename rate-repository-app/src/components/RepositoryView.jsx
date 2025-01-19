import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from "./Text";
import { useParams } from "react-router-native";
import { FlatList, View, StyleSheet } from "react-native";
import theme from "../theme";

const border = 60;

const styles = StyleSheet.create({
  rating: {
    height: border,
    width: border,
    borderRadius: border / 2,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    margin: 5,
    display: "flex",
    alignContent: "center",
  },
  textRating: {
    color: theme.colors.primary,
    paddingTop: border / 4,
    textAlign: "center",
  },
  container: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
  },
});

const ReviewItem = ({ review }) => {
  const date = new Date(review.createdAt);

  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text style={styles.textRating}>{review.rating}</Text>
      </View>

      <View style={{ flex: 1, paddingLeft: 10 }}>
        <Text style={{ fontWeight: theme.fontWeights.bold }}>
          {review.user.username}
        </Text>
        <Text>{date.toLocaleDateString("en-GB")}</Text>
        <Text style={{ flex: 1, paddingTop: 5 }}>{review.text}</Text>
      </View>
    </View>
  );
};

const RepositoryView = () => {
  const { repoid } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: repoid },
  });

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>{error.message}</Text>;

  const reviews = data.repository.reviews.edges.map((e) => e.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={<View style={{ height: 12 }} />}
      ListHeaderComponent={
        <View style={{ marginBottom: 10 }}>
          <RepositoryItem item={data.repository} show={true} />
        </View>
      }
    />
  );
};

export default RepositoryView;
