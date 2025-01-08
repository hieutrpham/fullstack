/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/bmi", (req, res) => {
  const weight: number = Number(req.query.weight);
  const height: number = Number(req.query.height);

  if (!weight || !height) {
    res.send({ error: "malformated query" });
    return;
  }
  const bmi = calculateBmi(height, weight);
  res.send({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.send({ error: "parameters missing" });
    return;
  }

  const ex = daily_exercises
    .map((i: unknown) => (typeof i === "number" ? 0 : 1))
    .reduce((acc: number, cur: number) => acc + cur, 0);

  if (ex > 0) {
    res.send({ error: "malformatted params" });
    return;
  }

  const result = calculateExercises(daily_exercises, target);
  res.send({ ...result, target: target });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
