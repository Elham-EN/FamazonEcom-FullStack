import {
  validateEmail,
  validateNameLength,
  validatePasswordLength,
} from "./validations";

// Unit Testing - Testing all edge cases
describe("Email validation", () => {
  let email = "";
  test("an empty input should not be valid", () => {
    expect(validateEmail(email)).toEqual(false);
  });
  test("It should have an @ symbol", () => {
    email = "tom@gmail.com";
    expect(email.includes("@")).toEqual(true);
  });
  test("a valid email should pass validation", () => {
    email = "tom@gmail.com";
    expect(validateEmail(email)).toEqual(true);
  });
  test("an invalid email should not pass validation", () => {
    email = "tom@gmail";
    expect(validateEmail(email)).toEqual(false);
  });
});

describe("Field length validation", () => {
  describe("Name field", () => {
    let name = "";
    test("a name should fail length validation if it is not set", () => {
      expect(validateNameLength(name)).toEqual(false);
    });
    test("a name should fail length validation if it is less than 2 characters", () => {
      name = "J";
      expect(validateNameLength(name)).toEqual(false);
    });
    test("a name should pass length validation if it is 2 characters", () => {
      name = "Jo";
      expect(validateNameLength(name)).toEqual(true);
    });
    test("a name should pass length validation if it is greater than 2 characters", () => {
      name = "Jonny";
      expect(validateNameLength(name)).toEqual(true);
    });
  });
  describe("Password field", () => {
    let password = "";
    test("a password should fail length validation if it is not set", () => {
      expect(validatePasswordLength(password)).toEqual(false);
    });
    test("a password should fail length validation if it is less than 6 characters", () => {
      password = "a33f";
      expect(validatePasswordLength(password)).toEqual(false);
    });
    test("a password should pass length validation if it is 6 characters", () => {
      password = "abc123";
      expect(validatePasswordLength(password)).toEqual(true);
    });
    test("a password should pass length validation if it is greater than 6 characters", () => {
      password = "abcd1234";
      expect(validatePasswordLength(password)).toEqual(true);
    });
  });
});
