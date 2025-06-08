"use client";

import { useState } from "react";
import { Form, FieldDefinition } from "@/core/types";
import { createEntity } from "@/core/actions";
import FieldEditor from "./FieldEditor";
import styles from "./FormEditor.module.css";
import { toast } from "react-hot-toast";

interface FormEditorProps {
  initialForm?: Form;
}

function FormEditor({ initialForm }: FormEditorProps) {
  const [form, setForm] = useState<Form>(
    initialForm || {
      id: "",
      type: "Form",
      label: "",
      description: "",
      properties: [],
    }
  );

  const [field, setField] = useState<FieldDefinition>({
    name: "",
    label: "",
    required: false,
    description: "",
    type: "string",
  });

  const handleSubmit = async () => {
    try {
      await createEntity(form);
      toast.success("Form saved successfully!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      toast.error("Failed to save form.");
    }
  };

  const handleAddField = () => {
    if (!field.name) return;
    setForm((prev) => ({
      ...prev,
      properties: [...prev.properties, field],
    }));
    setField({
      name: "",
      label: "",
      required: false,
      description: "",
      type: "string",
    });
  };

  return (
    <div className={styles.formEditor}>
      <div className={styles.formFields}>
        <h2>Form Details</h2>
        <input
          placeholder="ID"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />
        <input
          placeholder="Label"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <FieldEditor field={field} setField={setField} />
      <button className={styles.button} onClick={handleAddField} type="button">
        Add Field
      </button>
      <div className={styles.fieldsSection}>
        <h2>Fields</h2>
        {form.properties.length === 0 ? (
          <div
            style={{
              color: "#888",
              fontStyle: "italic",
              padding: "0.5em 0",
            }}
          >
            No fields added yet.
          </div>
        ) : (
          <ul className={styles.fieldsList}>
            {form.properties.map((f, idx) => (
              <li key={idx} className={styles.fieldsItem}>
                <div className={styles.fieldsLabel}>
                  {f.label || <span style={{ color: "#888" }}>(No label)</span>}
                  {f.required && (
                    <span className={styles.fieldsRequired}>*</span>
                  )}
                  <span className={styles.fieldsType}>[{f.type}]</span>
                </div>
                <div>
                  <span className={styles.fieldsName}>{f.name}</span>
                  {f.description && (
                    <span className={styles.fieldsDescription}>
                      – {f.description}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className={styles.button} onClick={handleSubmit}>
        Save Form
      </button>
    </div>
  );
}

export default FormEditor;
