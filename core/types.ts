export type FieldDefinition = {
  name: string;
  label: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "list"
    | "object"
    | "relation"
    | "datetime";
  required?: boolean;
  description?: string;
  listType?:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "relation"
    | "datetime";
  // For relation type:
  relationType?: string; // The entity type this field relates to (e.g., "User", "Form", etc.)
  relationLabelField?: string; // Optional: which field to use as the display label for the related entity
  relationMultiple?: boolean; // Optional: allow multiple relations (like a list)
};

export type Entity = {
  id: string;
  type: string;
  [key: string]: unknown;
};

export type Form = Entity & {
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
      listType: "object",
    },
  ],
};

export type DBEntity = {
  id: string;
  type: string;
  essence: Record<string, unknown>;
};
