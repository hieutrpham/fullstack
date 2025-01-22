import Text from "./Text";
import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { FlatList, View, StyleSheet } from "react-native";
import theme from "../theme";

const border = 40;

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

const SingleReviewItem = ({ review }) => {
  const date = new Date(review.createdAt);

  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text style={styles.textRating}>{review.rating}</Text>
      </View>

      <View style={{ flex: 1, paddingLeft: 10 }}>
        <Text style={{ fontWeight: theme.fontWeights.bold }}>
          {review.repository.name}
        </Text>
        <Text>{date.toLocaleDateString("en-GB")}</Text>
        <Text style={{ flex: 1, paddingTop: 5 }}>{review.text}</Text>
      </View>
    </View>
  );
};

const CurrentUserReview = () => {
  const { loading, data } = useQuery(ME, {
    variables: { includeReviews: true },
  });

  if (loading) return <Text>Loading...</Text>;

  const reviews = data ? data.me.reviews.edges.map((e) => e.node) : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={<View style={{ height: 10 }} />}
      renderItem={({ item }) => <SingleReviewItem review={item} />}
    />
  );
};

export default CurrentUserReview;
