export type FieldDefinition = {
  label: string;
  type: "string" | "number" | "boolean" | "list" | "object";
  required?: boolean;
  description?: string;
  listType?: "string" | "number" | "boolean" | "object";
};

export type Form = {
  id: string;
  type: string;
  label: string;
  description: string;
  properties: FieldDefinition[];
};

export const formForm: Form = {
  id: "form-Form",
  type: "Form",
  label: "Example Form",
  description: "Main semantic container for a form",
  properties: [
    {
      label: "ID",
      type: "string",
      required: true,
      description: "ID of the form",
    },
    {
      label: "Type",
      type: "string",
      required: true,
      description: "Type of the form",
    },
    {
      label: "Label",
      type: "string",
      required: true,
      description: "label for the form",
    },
    {
      label: "Description",
      type: "string",
      required: true,
      description: "Description for the form",
    },
    {
      label: "Properties",
      type: "list",
      required: false,
      description: "Properties of the form",
    },
  ],
};
