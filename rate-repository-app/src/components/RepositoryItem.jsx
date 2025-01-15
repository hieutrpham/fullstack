import { View, Text } from "react-native-web";

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text>
        Full Name: {item.fullName} <br />
        Description: {item.description} <br />
        Language: {item.language} <br />
        Forks: {item.forksCount}
        <br />
        Stars: {item.stargazersCount}
        <br />
        Rating: {item.ratingAverage}
        <br />
        Review: {item.reviewCount}
      </Text>
    </View>
  );
};

export default RepositoryItem;
