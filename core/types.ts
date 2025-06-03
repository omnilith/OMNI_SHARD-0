export type FieldDefinition = {
  name: string;
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
      name: "id",
      label: "ID",
      type: "string",
      required: true,
      description: "ID of the form",
    },
    {
      name: "type",
      label: "Type",
      type: "string",
      required: true,
      description: "Type of the form",
    },
    {
      name: "label",
      label: "Label",
      type: "string",
      required: true,
      description: "label for the form",
    },
    {
      name: "description",
      label: "Description",
      type: "string",
      required: true,
      description: "Description for the form",
    },
    {
      name: "properties",
      label: "Properties",
      type: "list",
      required: false,
      description: "Properties of the form",
    },
  ],
};

export type Entity = {
  id: string;
  type: string;
  [key: string]: unknown;
};
