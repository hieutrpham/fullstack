interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exercises: number[], target: number): Result => {
  const x = exercises.length;
  const trainingDays = exercises.reduce(
    (acc, cur) => (cur > 0 ? acc + 1 : acc),
    0
  );
  const average = exercises.reduce((acc, cur) => acc + cur, 0) / x;
  const success = average >= target ? true : false;
  const rating = success ? 1 : 0;
  const ratingDescription = rating === 1 ? "not bad" : "could do better";

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
