import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

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

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
