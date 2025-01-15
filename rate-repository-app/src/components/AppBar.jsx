import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => {}}>
        <Text style={{ color: "white" }}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
