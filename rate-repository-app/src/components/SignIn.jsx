import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: theme.colors.background,
    flex: 1,
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

  errorStyle: {
    color: theme.colors.error,
    width: "80%",
  },

  buttonStyle: {
    width: "80%",
    alignContent: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});
const SignIn = () => {
  const [signIn, data] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: async () => {
      await signIn({
        username: formik.values.username,
        password: formik.values.password,
      });
      // console.log(data.authenticate.accessToken);
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

      <Pressable onPress={formik.handleSubmit} style={styles.buttonStyle}>
        <Text style={{ color: "white", alignSelf: "center" }}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
