const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height * height);
  if (bmi <= 0.0025) {
    return "normal";
  } else if (bmi >= 0.003) {
    return "obese";
  } else {
    return "overweight";
  }
};

export default calculateBmi;
