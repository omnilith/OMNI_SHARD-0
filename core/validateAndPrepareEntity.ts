import { FieldDefinition, Form, Entity, RawEntity } from "@/core/types";
// import { forms } from "./data";

type ValidationResult =
  | { valid: true; entity: Entity }
  | { valid: false; error: string };

export function validateAndPrepareEntity(
  raw: RawEntity,
  form: Form
): ValidationResult {
  const result: Entity = {
    id: raw.id,
    type: raw.type,
  };

  for (const [key, field] of Object.entries(form.properties)) {
    const rawValue = raw[key];

    if (rawValue === undefined || rawValue === null) {
      if (field.default !== undefined) {
        result[key] = field.default;
        continue;
      } else if (field.required) {
        return { valid: false, error: `Missing required field: "${key}"` };
      } else {
        continue;
      }
    }

    const validation = validateValue(rawValue, field);
    if (!validation.valid) {
      return { valid: false, error: `Field "${key}": ${validation.error}` };
    }

    result[key] = validation.value;
  }

  return { valid: true, entity: result };
}

function validateValue(
  value: unknown,
  field: FieldDefinition
): { valid: true; value: unknown } | { valid: false; error: string } {
  switch (field.type) {
    case "string":
      return typeof value === "string"
        ? { valid: true, value }
        : { valid: false, error: "Expected string" };

    case "number":
      return typeof value === "number"
        ? { valid: true, value }
        : { valid: false, error: "Expected number" };

    case "boolean":
      return typeof value === "boolean"
        ? { valid: true, value }
        : { valid: false, error: "Expected boolean" };

    case "datetime":
      return typeof value === "string" && !isNaN(Date.parse(value))
        ? { valid: true, value: new Date(value).toISOString() }
        : { valid: false, error: "Expected ISO datetime string" };

    case "reference":
      return typeof value === "string"
        ? { valid: true, value }
        : { valid: false, error: "Expected reference ID (string)" };

    case "list":
      if (!Array.isArray(value)) {
        return { valid: false, error: "Expected array" };
      }
      if (!field.itemType) {
        return { valid: false, error: "Missing itemType for list" };
      }
      const validated = [];
      for (let i = 0; i < value.length; i++) {
        const item = validateValue(value[i], field.itemType);
        if (!item.valid) {
          return {
            valid: false,
            error: `Invalid item at index ${i}: ${item.error}`,
          };
        }
        validated.push(item.value);
      }
      return { valid: true, value: validated };

    case "object":
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
        return { valid: false, error: "Expected structured object" };
      }

      // ✅ Just accept it as-is for now
      return { valid: true, value };

    default:
      return { valid: false, error: `Unknown field type: ${field.type}` };
  }
}
