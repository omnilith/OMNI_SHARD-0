"use client";

import { useState } from "react";
import { Form, Entity, FieldDefinition } from "@/core/types";
import { createEntity } from "@/core/actions";
import { toast } from "react-hot-toast";
import { useEntitiesByType } from "../hooks/useEntitiesByType";

// Helper to get initial values for the entity
function getInitialEntity(
  form: Form,
  entity?: Entity,
  typeOverride?: string
): Entity {
  // Generate a random id if not provided
  function generateId() {
    return (
      (typeOverride || form.type).toLowerCase() +
      "-" +
      Math.random().toString(36).substring(2, 10)
    );
  }
  const initial: Entity = {
    id: entity?.id || generateId(),
    type: typeOverride || form.type,
  };
  form.properties.forEach((field) => {
    if (entity && entity[field.name] !== undefined) {
      initial[field.name] = entity[field.name];
    } else if (field.type === "boolean") {
      initial[field.name] = false;
    } else if (field.type === "list") {
      initial[field.name] = [];
    } else {
      initial[field.name] = "";
    }
  });
  return { ...initial, ...entity };
}

type GenericEntityEditorProps = {
  form: Form;
  type: string; // Type of the entity, e.g., "Form", "User", etc.
  entity?: Entity; // undefined if creating
};

function GenericEntityEditor({ form, entity, type }: GenericEntityEditorProps) {
  const [values, setValues] = useState<Entity>(() =>
    getInitialEntity(form, entity, type)
  );
  const [saving, setSaving] = useState(false);

  // Prepare hooks for all relation fields
  const relationFields = form.properties.filter(
    (f) => f.type === "relation" && f.relationType
  );
  // Map field name to { entities, loading }
  const relationData: Record<string, { entities: Entity[]; loading: boolean }> =
    {};
  relationFields.forEach((field) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { entities, loading } = useEntitiesByType(field.relationType);
    relationData[field.name] = { entities, loading };
  });

  const handleChange = (field: FieldDefinition, value: unknown) => {
    setValues((prev) => ({ ...prev, [field.name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createEntity(values);
      toast.success("Entity saved successfully!");
    } catch {
      toast.error("Failed to save entity.");
    } finally {
      setSaving(false);
    }
  };

  // Helper to get label for an entity
  const getEntityLabel = (entity: Entity, field: FieldDefinition) => {
    if (field.relationLabelField && entity[field.relationLabelField]) {
      return String(entity[field.relationLabelField]);
    }
    return entity.id;
  };

  return (
    <form
      onSubmit={handleSave}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        maxWidth: 500,
      }}
    >
      <h2>{form.label}</h2>
      <p style={{ color: "#888", marginBottom: 8 }}>{form.description}</p>
      {form.properties.map((field) => {
        const val = values[field.name];
        // For relation fields, get options from relationData
        const rel =
          field.type === "relation" ? relationData[field.name] : undefined;
        return (
          <div
            key={field.name}
            style={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            <label style={{ fontWeight: 500 }}>
              {field.label}
              {field.required && (
                <span style={{ color: "#e11d48", marginLeft: 4 }}>*</span>
              )}
            </label>
            {field.type === "string" && (
              <input
                type="text"
                value={val as string}
                onChange={(e) => handleChange(field, e.target.value)}
                required={field.required}
                placeholder={field.description}
              />
            )}
            {field.type === "number" && (
              <input
                type="number"
                value={val as number}
                onChange={(e) =>
                  handleChange(
                    field,
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                required={field.required}
                placeholder={field.description}
              />
            )}
            {field.type === "boolean" && (
              <input
                type="checkbox"
                checked={!!val}
                onChange={(e) => handleChange(field, e.target.checked)}
              />
            )}
            {field.type === "list" && (
              <textarea
                value={Array.isArray(val) ? val.join(", ") : ""}
                onChange={(e) =>
                  handleChange(
                    field,
                    e.target.value
                      .split(",")
                      .map((v) => v.trim())
                      .filter(Boolean)
                  )
                }
                required={field.required}
                placeholder={field.description || "Comma separated values"}
              />
            )}
            {field.type === "object" && (
              <textarea
                value={
                  typeof val === "object" && val !== null
                    ? JSON.stringify(val, null, 2)
                    : ""
                }
                onChange={(e) => {
                  try {
                    handleChange(field, JSON.parse(e.target.value));
                  } catch {
                    handleChange(field, e.target.value); // fallback to raw string if not valid JSON
                  }
                }}
                required={field.required}
                placeholder={field.description || "JSON object"}
              />
            )}
            {field.type === "relation" &&
              (field.relationMultiple ? (
                rel?.loading ? (
                  <span>Loading...</span>
                ) : (
                  <select
                    multiple
                    value={Array.isArray(val) ? val : []}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions).map(
                        (opt) => opt.value
                      );
                      handleChange(field, selected);
                    }}
                    required={field.required}
                  >
                    <option value="" disabled>
                      {rel?.entities.length === 0
                        ? "No options available"
                        : `Select ${field.relationType || "entities"}`}
                    </option>
                    {rel?.entities.map((ent) => (
                      <option key={ent.id} value={ent.id}>
                        {getEntityLabel(ent, field)}
                      </option>
                    ))}
                  </select>
                )
              ) : rel?.loading ? (
                <span>Loading...</span>
              ) : (
                <select
                  value={typeof val === "string" ? val : ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  required={field.required}
                >
                  <option value="">
                    {rel?.entities.length === 0
                      ? "No options available"
                      : `Select ${field.relationType || "entity"}`}
                  </option>
                  {rel?.entities.map((ent) => (
                    <option key={ent.id} value={ent.id}>
                      {getEntityLabel(ent, field)}
                    </option>
                  ))}
                </select>
              ))}
            {field.description && (
              <span style={{ color: "#888", fontSize: "0.97em" }}>
                {field.description}
              </span>
            )}
          </div>
        );
      })}
      <button type="submit" disabled={saving} style={{ marginTop: 16 }}>
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

export default GenericEntityEditor;
