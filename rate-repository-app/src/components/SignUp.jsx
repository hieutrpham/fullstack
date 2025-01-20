import { useFormik } from "formik";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import { CREATE_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), "must match"])
    .required("Password confirm is required"),
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  textStyle: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    height: 50,
    width: "80%",
    borderColor: "grey",
    borderWidth: 2,
    paddingHorizontal: 10,
    color: theme.colors.textSecondary,
  },
  buttonStyle: {
    width: "80%",
    alignContent: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  errorStyle: {
    color: theme.colors.error,
    width: "80%",
  },
});

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async () => {
      await createUser({
        variables: {
          user: {
            username: formik.values.username,
            password: formik.values.password,
          },
        },
      });

      Alert.alert("Thank you for signing up");

      await signIn({
        username: formik.values.username,
        password: formik.values.password,
      });

      navigate("/");
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        style={[
          styles.textStyle,
          { borderColor: formik.errors.username && theme.colors.error },
        ]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorStyle}>{formik.errors.username}</Text>
      )}

      <TextInput
        placeholder="password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry={true}
        style={[
          styles.textStyle,
          { borderColor: formik.errors.password && theme.colors.error },
        ]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorStyle}>{formik.errors.password}</Text>
      )}

      <TextInput
        placeholder="confirm password"
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange("passwordConfirm")}
        secureTextEntry={true}
        style={[
          styles.textStyle,
          { borderColor: formik.errors.passwordConfirm && theme.colors.error },
        ]}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={styles.errorStyle}>{formik.errors.passwordConfirm}</Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={styles.buttonStyle}>
        <Text style={{ color: "white", alignSelf: "center" }}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
