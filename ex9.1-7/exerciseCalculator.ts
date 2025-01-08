interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exercises: number[]): Result => {
  const x = exercises.length;
  const trainingDays = exercises.reduce(
    (acc, cur) => (cur > 0 ? acc + 1 : acc),
    0
  );
  const target = 2;
  const average = exercises.reduce((acc, cur) => acc + cur, 0) / x;
  const success = average >= target ? true : false;
  const rating = 2;
  const ratingDescription = "not bad";

  return {
    periodLength: x,
    trainingDays,
    success,
    average,
    rating,
    ratingDescription,
    target,
  };
};

export default calculateExercises;
