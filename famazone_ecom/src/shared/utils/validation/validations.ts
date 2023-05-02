import { ValidatorFn } from "./models/ValidatorFn";
import { LengthOptions } from "./models/options/length";

export const validateEmail: ValidatorFn = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email.trim());
};

// The function takes two arguments: text, which is a string representing
// the text to be validated, and options, which is an optional object containing
// properties that specify the minimum and/or maximum length that the text
// should be.
const _validateLength: ValidatorFn = (
  text: string,
  options?: LengthOptions
): boolean => {
  // remove any leading or trailing whitespace from the text string, and then
  // gets the length of the resulting string
  const textLength = text.trim().length;
  // function checks if the options object contains a min property, and if so,
  // it checks if the textLength is less than the min value. If it is, the
  // function returns false indicating that the validation has failed.
  if (options?.min && textLength < options.min) return false;
  // Similarly, the function checks if the options object contains a max
  // property, and if so, it checks if the textLength is greater than the max
  // value. If it is, the function returns false
  if (options?.max && textLength > options.max) return false;
  // Finally, if none of the previous conditions are met, the function returns
  // true, indicating that the validation has passed.
  return true;
};

export const validateNameLength: ValidatorFn = (text: string): boolean => {
  // Check if name input must have only text
  const nameRegex = /^[a-zA-Z]*$/;
  if (!nameRegex.test(text)) return false;
  return _validateLength(text, { min: 2 });
};

export const validatePasswordLength: ValidatorFn = (text: string): boolean => {
  return _validateLength(text, { min: 6, max: 20 });
};
