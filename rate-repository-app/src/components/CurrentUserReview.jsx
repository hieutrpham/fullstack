import Text from "./Text";
import { ME } from "../graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { FlatList, View, StyleSheet, Alert } from "react-native";
import theme from "../theme";
import { Button } from "react-native-paper";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";

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

const SingleReviewItem = ({ review, refetch }) => {
  const date = new Date(review.createdAt);
  const [deteleReview] = useMutation(DELETE_REVIEW, {
    variables: { deleteReviewId: review.id },
  });
  const navigate = useNavigate();

  return (
    <View style={{ backgroundColor: "white" }}>
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
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          style={{ borderRadius: 5, margin: 5 }}
          onPress={() => navigate(`/${review.repository.id}`)}
        >
          View Repository
        </Button>
        <Button
          mode="contained"
          buttonColor="red"
          style={{ borderRadius: 5, margin: 5 }}
          onPress={() => {
            Alert.alert("Delete Review", "Are you sure?", [
              { text: "Cancel", style: "cancel" },
              {
                text: "OK",
                onPress: async () => {
                  await deteleReview();
                  refetch();
                },
              },
            ]);
          }}
        >
          Delete Review
        </Button>
      </View>
    </View>
  );
};

const CurrentUserReview = () => {
  const { loading, data, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
  });

  if (loading) return <Text>Loading...</Text>;

  const reviews = data ? data.me.reviews.edges.map((e) => e.node) : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={<View style={{ height: 10 }} />}
      renderItem={({ item }) => (
        <SingleReviewItem review={item} refetch={refetch} />
      )}
    />
  );
};

export default CurrentUserReview;
