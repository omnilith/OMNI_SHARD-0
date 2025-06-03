import { Form, Entity } from "./types";

type ValidationResult =
  | { valid: true; entity: Entity }
  | { valid: false; error: string };

export function validateAndPrepareEntity(
  entity: Entity,
  form: Form
): ValidationResult {
  //If the submitted entity is not an object or is null, throw an error
  if (typeof entity !== "object" || entity === null) {
    throw new Error("Entity must be a non-null object");
  }

  //Loop through the form properties to validate the entity
  for (const field of form.properties) {
    //Get input value for the current field from the form
    const inputValue = entity[field.name];

    //If that field is required and not provided, return an error
    if (field.required && (inputValue === undefined || inputValue === null)) {
      return {
        valid: false,
        error: `Field "${field.name}" is required but not provided.`,
      };
    }

    //If the field type does not match the input value type, return an error
    if (inputValue !== undefined && inputValue !== null) {
      if (field.type === "string" && typeof inputValue !== "string") {
        return {
          valid: false,
          error: `Field "${field.name}" must be a string.`,
        };
      } else if (field.type === "number" && typeof inputValue !== "number") {
        return {
          valid: false,
          error: `Field "${field.name}" must be a number.`,
        };
      } else if (field.type === "boolean" && typeof inputValue !== "boolean") {
        return {
          valid: false,
          error: `Field "${field.name}" must be a boolean.`,
        };
      } else if (field.type === "list" && !Array.isArray(inputValue)) {
        return {
          valid: false,
          error: `Field "${field.name}" must be a list.`,
        };
      } else if (field.type === "object" && typeof inputValue !== "object") {
        return {
          valid: false,
          error: `Field "${field.name}" must be an object.`,
        };
      }
    }
  }

  return { valid: true, entity: entity as Entity };
}
