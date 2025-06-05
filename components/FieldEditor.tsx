import { FieldDefinition } from "@/core/types";

const FIELD_TYPES = ["string", "number", "boolean"] as const;

interface FieldEditorProps {
  field: FieldDefinition;
  setField: React.Dispatch<React.SetStateAction<FieldDefinition>>;
}

function FieldEditor({ field, setField }: FieldEditorProps) {
  return (
    <div>
      <label>
        Type:
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
  );
}

export default FieldEditor;
