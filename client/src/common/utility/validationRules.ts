import { ValidationRule } from "react-hook-form";

const requiredRule: ValidationRule<boolean> = {
  value: true,
  message: "Field is required"
}

function createMaxLengthRule(maxLength: number): ValidationRule<number> {
  return {
    value: maxLength,
    message: `Field has max length of ${maxLength} characters`
  }
}

function createNonNegativeRule(): ValidationRule<number> {
  return {
    value: 0,
    message: `Field must be non-negative`
  }
}

export {
  requiredRule,
  createMaxLengthRule,
  createNonNegativeRule
}