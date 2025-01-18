import { SIGN_IN } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useSignIn = () => {
  const [mutate, { data }] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    console.log(username, password);
    await mutate({ variables: { credentials: { username, password } } });
  };

  return [signIn, data];
};

export default useSignIn;
