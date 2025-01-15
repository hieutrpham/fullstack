import { View } from "react-native";
import Text from "./Text";

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text color="primary" fontWeight="bold">
        Full Name: {item.fullName}
      </Text>
      <Text color="textSecondary">Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
      <Text>Review: {item.reviewCount}</Text>
    </View>
  );
};

export default RepositoryItem;
