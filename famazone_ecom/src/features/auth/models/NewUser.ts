import { RegisterFormField } from "./RegisterFormField.interface";

// Omit keyword is a TypeScript utility type that creates a new type
// by omitting a specific property from an existing type. This means
// that the NewUser type will have all the properties of the
// RegisterFormField type except for the "confirmPassword" property.
// By using Omit, the developer can create a new type that is a subset
// of an existing type, but without the need to explicitly list all the
// properties that should be included or excluded. This can make the code
// more concise and less prone to errors.
export type NewUser = Omit<RegisterFormField, "confirmPassword">;
