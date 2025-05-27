import type { Gender } from "../models/user";

export function calculateBMI(
  age: number,
  weightKg: number,
  heightCm: number
): BMICalculationResult | null {
  if (heightCm <= 0 || weightKg <= 0) {
    return null;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let category: string;

  // Adult BMI categories
  if (age >= 18) {
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi < 24.9) {
      category = "Normal weight";
    } else if (bmi < 29.9) {
      category = "Overweight";
    } else {
      category = "Obese";
    }
  } else {
    category = "BMI interpretation varies for children and teens.";
  }

  return {
    bmi: parseFloat(bmi.toFixed(2)),
    category,
  };
}

export interface BMICalculationResult {
  bmi: number;
  category: string;
}

interface BodyFatEstimateInput {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
}

interface BodyFatEstimateResult {
  bmi: number;
  bodyFatPercentage: number;
  category: string;
}

export function estimateBodyFatFromBMI({
  gender,
  age,
  heightCm,
  weightKg,
}: BodyFatEstimateInput): BodyFatEstimateResult | null {
  if (heightCm <= 0 || weightKg <= 0 || age <= 0) {
    return null;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const genderConstant = gender === "male" ? 1 : 0;

  // Deurenberg formula
  const bodyFat = 1.2 * bmi + 0.23 * age - 10.8 * genderConstant - 5.4;

  // Categorization (approximate for adults)
  let category: string;
  if (gender === "male") {
    if (bodyFat < 6) category = "Essential fat";
    else if (bodyFat < 14) category = "Athletes";
    else if (bodyFat < 18) category = "Fitness";
    else if (bodyFat < 25) category = "Average";
    else category = "Obese";
  } else {
    if (bodyFat < 14) category = "Essential fat";
    else if (bodyFat < 21) category = "Athletes";
    else if (bodyFat < 25) category = "Fitness";
    else if (bodyFat < 32) category = "Average";
    else category = "Obese";
  }

  return {
    bmi: parseFloat(bmi.toFixed(2)),
    bodyFatPercentage: parseFloat(bodyFat.toFixed(2)),
    category,
  };
}
