import { View, Text } from "react-native";

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text>Full Name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
      <Text>Review: {item.reviewCount}</Text>
    </View>
  );
};

export default RepositoryItem;
