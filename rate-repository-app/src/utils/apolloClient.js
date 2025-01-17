import { ApolloClient, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";

const { env, apolloUri } = Constants.expoConfig.extra;

const createApolloClient = () => {
  return new ApolloClient({
    uri: apolloUri,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
