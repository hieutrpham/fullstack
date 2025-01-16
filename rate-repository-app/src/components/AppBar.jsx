import { View, StyleSheet, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  textStyle: {
    color: "white",
    padding: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    margin: 5,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.textStyle}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.textStyle}>Sign In</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
