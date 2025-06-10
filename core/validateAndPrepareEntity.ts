import { Form, Entity, FieldDefinition } from "./types";

type ValidationResult =
  | { valid: true; entity: Entity }
  | { valid: false; error: string };

// --- Individual field validators ---
function validateString(field: FieldDefinition, value: unknown): string | null {
  return typeof value === "string"
    ? null
    : `Field "${field.name}" must be a string.`;
}

function validateNumber(field: FieldDefinition, value: unknown): string | null {
  return typeof value === "number"
    ? null
    : `Field "${field.name}" must be a number.`;
}

function validateBoolean(
  field: FieldDefinition,
  value: unknown
): string | null {
  return typeof value === "boolean"
    ? null
    : `Field "${field.name}" must be a boolean.`;
}

function validateList(field: FieldDefinition, value: unknown): string | null {
  return Array.isArray(value) ? null : `Field "${field.name}" must be a list.`;
}

function validateObject(field: FieldDefinition, value: unknown): string | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? null
    : `Field "${field.name}" must be an object.`;
}

function validateRelation(
  field: FieldDefinition,
  value: unknown
): string | null {
  if (field.relationMultiple) {
    if (!Array.isArray(value) || value.some((v) => typeof v !== "string")) {
      return `Field "${field.name}" must be an array of IDs (strings).`;
    }
  } else {
    if (typeof value !== "string") {
      return `Field "${field.name}" must be a string (ID).`;
    }
  }
  return null;
}

function validateDatetime(
  field: FieldDefinition,
  value: unknown
): string | null {
  return typeof value === "string"
    ? null
    : `Field "${field.name}" must be a datetime string (ISO format).`;
}

function validateEnum(field: FieldDefinition, value: unknown): string | null {
  if (field.enumMultiple) {
    if (
      !Array.isArray(value) ||
      value.some(
        (v) => typeof v !== "string" || !field.enumOptions?.includes(v)
      )
    ) {
      return `Field "${
        field.name
      }" must be an array of allowed values: ${field.enumOptions?.join(", ")}.`;
    }
  } else {
    if (typeof value !== "string" || !field.enumOptions?.includes(value)) {
      return `Field "${field.name}" must be one of: ${field.enumOptions?.join(
        ", "
      )}.`;
    }
  }
  return null;
}

// --- Map types to validators ---
const typeValidators = {
  string: validateString,
  number: validateNumber,
  boolean: validateBoolean,
  list: validateList,
  object: validateObject,
  relation: validateRelation,
  datetime: validateDatetime,
  enum: validateEnum,
};

export function validateEntity(
  entity: Entity,
  form: Form
): { valid: true } | { valid: false; error: string } {
  if (typeof entity !== "object" || entity === null) {
    throw new Error("Entity must be a non-null object");
  }
  for (const field of form.properties) {
    const inputValue = entity[field.name];
    if (
      field.required &&
      (inputValue === undefined || inputValue === null || inputValue === "")
    ) {
      return {
        valid: false,
        error: `Field "${field.name}" is required but not provided.`,
      };
    }
    if (inputValue !== undefined && inputValue !== null) {
      const validator = typeValidators[field.type];
      if (validator) {
        const error = validator(field, inputValue);
        if (error) {
          return { valid: false, error };
        }
      }
    }
  }
  return { valid: true };
}

export function prepareEntity(entity: Entity): Entity {
  // _form is unused for now; this is intentional for future extension
  return entity;
}

export function validateAndPrepareEntity(
  entity: Entity,
  form: Form
): ValidationResult {
  const validation = validateEntity(entity, form);
  if (!validation.valid) {
    return { valid: false, error: validation.error };
  }
  const prepared = prepareEntity(entity);
  return { valid: true, entity: prepared };
}
