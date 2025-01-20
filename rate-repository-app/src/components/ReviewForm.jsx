import { useFormik } from "formik";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Owner name is required"),
  repoName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .integer("Rating must be an integer")
    .min(0)
    .max(100)
    .required("Rating is required"),
  review: yup.string().optional(),
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

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repoName: "",
      rating: "",
      review: "",
    },
    validationSchema,
    onSubmit: async () => {
      console.log(typeof Number(formik.values.rating));
      const review = await createReview({
        variables: {
          review: {
            repositoryName: formik.values.repoName,
            ownerName: formik.values.ownerName,
            rating: Number(formik.values.rating),
            text: formik.values.review,
          },
        },
      });
      console.log(review);
      Alert.alert("Thank you for reviewing");
      navigate(`/${review.repositoryId}`);
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        style={[
          styles.textStyle,
          { borderColor: formik.errors.ownerName && theme.colors.error },
        ]}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorStyle}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        placeholder="Repository name"
        value={formik.values.repoName}
        onChangeText={formik.handleChange("repoName")}
        style={[
          styles.textStyle,
          { borderColor: formik.errors.repoName && theme.colors.error },
        ]}
      />
      {formik.touched.repoName && formik.errors.repoName && (
        <Text style={styles.errorStyle}>{formik.errors.repoName}</Text>
      )}

      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        style={[
          styles.textStyle,
          { borderColor: formik.errors.rating && theme.colors.error },
        ]}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorStyle}>{formik.errors.rating}</Text>
      )}

      <TextInput
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
        style={styles.textStyle}
        multiline={true}
      />
      <Pressable onPress={formik.handleSubmit} style={styles.buttonStyle}>
        <Text style={{ color: "white", alignSelf: "center" }}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;
