import { Form, FieldDefinition } from "./types";

const formId: FieldDefinition = {
  type: "string",
  required: true,
  description: "Id of the form",
};

const formType: FieldDefinition = {
  type: "string",
  required: true,
  description: "Type of the Form",
};

const formLabel: FieldDefinition = {
  type: "string",
  description: "Label for the form",
  required: true,
};

const formDescription: FieldDefinition = {
  type: "string",
  description: "Description of the form",
};

const formProperties: FieldDefinition = {
  type: "object",
  required: true,
  description: "Properties that the form posesses",
};

export const forms: Form[] = [
  {
    id: "form-Form",
    type: "Form",
    label: "Form",
    description: "Form type",
    properties: {
      id: formId,
      type: formType,
      label: formLabel,
      description: formDescription,
      properties: formProperties,
    },
  },
];
