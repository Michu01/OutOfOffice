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

export {
  requiredRule,
  createMaxLengthRule
}