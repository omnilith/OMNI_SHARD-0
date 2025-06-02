export type FieldDefinition = {
  type:
    | "string"
    | "number"
    | "boolean"
    | "datetime"
    | "reference"
    | "list"
    | "object";
  required?: boolean;
  refType?: string;
  default?: unknown;
  label?: string;
  description?: string;
  itemType?: FieldDefinition;
  properties?: Record<string, FieldDefinition>; // if type === object
};

export type Form = {
  id: string;
  type: "Form";
  label: string;
  description?: string;
  properties: Record<string, FieldDefinition>;
};

export type RawEntity = {
  id: string;
  type: string;
  [key: string]: unknown;
};

export type Entity = {
  id: string;
  type: string;
  [key: string]: unknown;
};
