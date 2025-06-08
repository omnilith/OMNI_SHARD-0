import { FieldDefinition } from "@/core/types";
import styles from "./FieldEditor.module.css";

const FIELD_TYPES = ["string", "number", "boolean"] as const;

interface FieldEditorProps {
  field: FieldDefinition;
  setField: React.Dispatch<React.SetStateAction<FieldDefinition>>;
}

function FieldEditor({ field, setField }: FieldEditorProps) {
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
