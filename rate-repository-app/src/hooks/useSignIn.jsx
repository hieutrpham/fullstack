import { SIGN_IN } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, { data }] = useMutation(SIGN_IN);
  const client = useApolloClient();

  const signIn = async ({ username, password }) => {
    await mutate({ variables: { credentials: { username, password } } });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    console.log("token", authStorage.getAccessToken());
    client.resetStore();
  };

  return [signIn, data];
};

export default useSignIn;
