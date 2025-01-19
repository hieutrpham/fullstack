import { SIGN_IN } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate] = useMutation(SIGN_IN);
  const client = useApolloClient();

  const signIn = async ({ username, password }) => {
    const token = await mutate({
      variables: { credentials: { username, password } },
    });

    await authStorage.setAccessToken(token.data.authenticate.accessToken);
    client.resetStore();
  };

  return [signIn];
};

export default useSignIn;
