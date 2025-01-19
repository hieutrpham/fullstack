import { Image, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { openURL } from "expo-linking";

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    // flexWrap: "wrap",
    alignItems: "flex-start",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
    maxWidth: "100%",
  },
  text: {
    flexShrink: 1,
    flexWrap: "wrap",
    width: "100%",
    overflow: "hidden",
  },
  textStat: {
    fontFamily: theme.fonts.main,
    fontWeight: "bold",
    textAlign: "center",
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
    color: "white",
    marginTop: 8,
  },
});

const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
};

const RepositoryItem = ({ item, show = false }) => {
  return (
    <View
      style={{
        padding: 1,
        backgroundColor: "white",
      }}
    >
      <View style={styles.flexRow}>
        <Image
          source={{ uri: item.ownerAvatarUrl }}
          style={{ width: 50, height: 50, marginTop: 10, borderRadius: 7 }}
        />
        <View
          style={[
            styles.flexColumn,
            { paddingLeft: 20, flex: 1, flexWrap: "wrap" },
          ]}
        >
          <Text color="primary" fontWeight="bold">
            {item.fullName} {"\n"}
          </Text>

          <Text color="textSecondary" style={styles.text}>
            {item.description} {"\n"}
          </Text>

          <Text style={styles.languageContainer}>{item.language}</Text>
        </View>
      </View>

      <View style={[styles.flexRow, { justifyContent: "space-around" }]}>
        <View style={styles.flexColumn}>
          <Text style={styles.textStat}>{formatNumber(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>

        <View style={styles.flexColumn}>
          <Text style={styles.textStat}>
            {formatNumber(item.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>

        <View style={styles.flexColumn}>
          <Text style={styles.textStat}>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>

        <View style={styles.flexColumn}>
          <Text style={styles.textStat}>{item.ratingAverage}</Text>
          <Text>Ratings</Text>
        </View>
      </View>

      {show ? (
        <Pressable onPress={() => openURL(item.url)}>
          <Text
            style={[
              styles.languageContainer,
              {
                alignSelf: "center",
                borderRadius: 2,
                width: "80%",
                textAlign: "center",
              },
            ]}
          >
            Open in GitHub
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default RepositoryItem;
