import { FieldDefinition } from "@/core/types";
import { useState, useEffect } from "react";
import styles from "./FieldEditor.module.css";

const FIELD_TYPES = [
  "string",
  "number",
  "boolean",
  "relation",
  "datetime",
  "enum",
  "list",
] as const;

interface FieldEditorProps {
  field: FieldDefinition;
  setField: React.Dispatch<React.SetStateAction<FieldDefinition>>;
}

function FieldEditor({ field, setField }: FieldEditorProps) {
  // Local state for enum input
  const [enumInput, setEnumInput] = useState(
    field.enumOptions ? field.enumOptions.join(", ") : ""
  );

  useEffect(() => {
    setEnumInput(field.enumOptions ? field.enumOptions.join(", ") : "");
  }, [field.enumOptions]);

  return (
    <div className={styles.fieldEditor}>
      <div className={styles.fieldEditorFields}>
        <label>
          Type: {""}
          <select
            value={field.type}
            onChange={(e) =>
              setField((prev) => ({
                ...prev,
                type: e.target.value as FieldDefinition["type"],
                // Reset relation fields if not relation type
                ...(e.target.value === "relation"
                  ? {}
                  : {
                      relationType: undefined,
                      relationLabelField: undefined,
                      relationMultiple: undefined,
                    }),
              }))
            }
          >
            {FIELD_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>
      {field.type === "relation" && (
        <div className={styles.fieldEditorFields}>
          <label>
            Relation Type:
            <input
              type="text"
              value={field.relationType || ""}
              onChange={(e) =>
                setField((prev) => ({ ...prev, relationType: e.target.value }))
              }
              placeholder="e.g. User, Form, etc."
            />
          </label>
          <label>
            Relation Label Field:
            <input
              type="text"
              value={field.relationLabelField || ""}
              onChange={(e) =>
                setField((prev) => ({
                  ...prev,
                  relationLabelField: e.target.value,
                }))
              }
              placeholder="e.g. name, label"
            />
          </label>
          <label>
            Allow Multiple:
            <input
              type="checkbox"
              checked={!!field.relationMultiple}
              onChange={(e) =>
                setField((prev) => ({
                  ...prev,
                  relationMultiple: e.target.checked,
                }))
              }
            />
          </label>
        </div>
      )}
      {field.type === "enum" && (
        <div className={styles.fieldEditorFields}>
          <label>
            Enum Options:
            <input
              type="text"
              value={enumInput}
              onChange={(e) => setEnumInput(e.target.value)}
              onBlur={() =>
                setField((prev) => ({
                  ...prev,
                  enumOptions: enumInput
                    .split(",")
                    .map((v) => v.trim())
                    .filter(Boolean),
                }))
              }
              placeholder="Comma separated values"
            />
          </label>
          <label>
            Allow Multiple:
            <input
              type="checkbox"
              checked={!!field.enumMultiple}
              onChange={(e) =>
                setField((prev) => ({
                  ...prev,
                  enumMultiple: e.target.checked,
                }))
              }
            />
          </label>
        </div>
      )}
      {field.type === "list" && (
        <div className={styles.fieldEditorFields}>
          <label>
            List Type:
            <select
              value={field.listType || ""}
              onChange={(e) =>
                setField((prev) => ({
                  ...prev,
                  listType: e.target.value as FieldDefinition["listType"],
                }))
              }
            >
              <option value="">Select type...</option>
              {[
                "string",
                "number",
                "boolean",
                "object",
                "relation",
                "datetime",
                "enum",
              ].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      <div>
        <label>
          Required:
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) =>
              setField((prev) => ({
                ...prev,
                required: e.target.checked,
              }))
            }
          />
        </label>
      </div>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={field.name}
            onChange={(e) =>
              setField((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </label>
      </div>
      <div>
        <label>
          Label:
          <input
            type="text"
            value={field.label}
            onChange={(e) =>
              setField((prev) => ({
                ...prev,
                label: e.target.value,
              }))
            }
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            value={field.description}
            onChange={(e) =>
              setField((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </label>
      </div>
    </div>
  );
}

export default FieldEditor;
