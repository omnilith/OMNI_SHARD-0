import { Form, FieldDefinition } from "./types";

// Used in form-Form
const formId: FieldDefinition = {
  type: "string",
  required: true,
  description: "ID of the form entity",
};

const formType: FieldDefinition = {
  type: "string",
  required: true,
  description: "Entity type — should always be 'Form'",
};

const formLabel: FieldDefinition = {
  type: "string",
  required: true,
  description: "Human-readable label for the form",
};

const formDescription: FieldDefinition = {
  type: "string",
  description: "Optional description of the form's purpose",
};

// Recursive FieldDefinition schema
const fieldDefinition: Record<string, FieldDefinition> = {
  type: {
    type: "string",
    required: true,
    description: "The type of this field (e.g. string, object, list)",
  },
  required: {
    type: "boolean",
    description: "Whether the field is required",
  },
  refType: {
    type: "string",
    description: "Reference type (only for reference fields)",
  },
  default: {
    type: "string", // you could make this `unknown`, but keep string for now
    description: "Default value if none is provided",
  },
  label: {
    type: "string",
    description: "Label for display in UI",
  },
  description: {
    type: "string",
    description: "Explanation or help text",
  },
  itemType: {
    type: "object",
    description:
      "Used if type is 'list'. Describes the field type of list items.",
    properties: {}, // recursive
  },
  properties: {
    type: "object",
    description: "Used if type is 'object'. Describes the shape of the object.",
    properties: {}, // recursive
  },
};

// Used in form-Form
const formProperties: FieldDefinition = {
  type: "object",
  required: false,
  description: "Properties that define the structure of this Form",
  properties: fieldDefinition,
};

// 👇 You now have two semantic forms
export const forms: Form[] = [
  {
    id: "form-FieldDefinition",
    type: "Form",
    label: "FieldDefinition",
    description: "A semantic field inside a Form definition.",
    properties: fieldDefinition,
  },
  {
    id: "form-Form",
    type: "Form",
    label: "Form",
    description: "A semantic definition of an object type in the system.",
    properties: {
      id: formId,
      type: formType,
      label: formLabel,
      description: formDescription,
      properties: formProperties,
    },
  },
];
