import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import theme from "../theme";
import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";

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
  const { loading, error, data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const navigate = useNavigate();

  if (loading) return <Text>Loading...</Text>;

  const handlePress = async () => {
    await authStorage.removeAccessToken();
    client.resetStore();
    navigate("/signin");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.textStyle}>Repositories</Text>
        </Link>
        {data.me ? (
          <Pressable onPress={handlePress}>
            <Text style={styles.textStyle}>Sign Out</Text>
          </Pressable>
        ) : (
          <Link to="/signin">
            <Text style={styles.textStyle}>Sign In</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
