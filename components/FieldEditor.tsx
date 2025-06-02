"use client";

import { FieldDefinition } from "@/core/types";
import { useState } from "react";

type Props = {
  fieldKey: string;
  definition: FieldDefinition;
  onChange: (def: FieldDefinition) => void;
  onDelete?: () => void;
};

const FIELD_TYPES = [
  "string",
  "number",
  "boolean",
  "datetime",
  "reference",
  "object",
  "list",
] as const;

export default function FieldEditor({
  fieldKey,
  definition,
  onChange,
  onDelete,
}: Props) {
  const [localDef, setLocalDef] = useState<FieldDefinition>(definition);

  const update = (updates: Partial<FieldDefinition>) => {
    const next = { ...localDef, ...updates };
    setLocalDef(next);
    onChange(next);
  };

  return (
    <div className="space-y-2 border rounded p-3">
      <div className="flex justify-between items-center">
        <strong>{fieldKey}</strong>
        {onDelete && (
          <button onClick={onDelete} className="text-sm text-red-500">
            Delete
          </button>
        )}
      </div>

      <label>
        Type:
        <select
          value={localDef.type}
          onChange={(e) =>
            update({ type: e.target.value as FieldDefinition["type"] })
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
          checked={localDef.required || false}
          onChange={(e) => update({ required: e.target.checked })}
        />
      </label>

      <label>
        Label:
        <input
          type="text"
          value={localDef.label || ""}
          onChange={(e) => update({ label: e.target.value })}
        />
      </label>

      <label>
        Description:
        <input
          type="text"
          value={localDef.description || ""}
          onChange={(e) => update({ description: e.target.value })}
        />
      </label>

      {localDef.type === "reference" && (
        <label>
          Ref Type:
          <input
            type="text"
            value={localDef.refType || ""}
            onChange={(e) => update({ refType: e.target.value })}
          />
        </label>
      )}

      {localDef.type === "list" && (
        <div className="border-t pt-2 mt-2">
          <strong>Item Type:</strong>
          <FieldEditor
            fieldKey="item"
            definition={localDef.itemType || { type: "string" }}
            onChange={(def) => update({ itemType: def })}
          />
        </div>
      )}

      {localDef.type === "object" && (
        <div className="border-t pt-2 mt-2">
          <strong>Properties:</strong>
          {Object.entries(localDef.properties || {}).map(([key, subField]) => (
            <div key={key} className="pl-2 mt-1">
              <FieldEditor
                fieldKey={key}
                definition={subField}
                onChange={(def) => {
                  const updated = {
                    ...(localDef.properties || {}),
                    [key]: def,
                  };
                  update({ properties: updated });
                }}
                onDelete={() => {
                  const updated = { ...(localDef.properties || {}) };
                  delete updated[key];
                  update({ properties: updated });
                }}
              />
            </div>
          ))}
          <button
            className="text-sm text-blue-600 mt-2"
            onClick={() => {
              const newKey = `field_${Date.now()}`;
              const updated = {
                ...(localDef.properties || {}),
                [newKey]: { type: "string" as const },
              };
              update({ properties: updated });
            }}
          >
            + Add Property
          </button>
        </div>
      )}
    </div>
  );
}
