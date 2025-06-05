"use client";

import { useState } from "react";
import { Form, FieldDefinition } from "@/core/types";
import { createEntity } from "@/core/actions";
import FieldEditor from "./FieldEditor";
import styles from "./FormEditor.module.css";

function FormEditor() {
  const [form, setForm] = useState<Form>({
    id: "",
    type: "Form",
    label: "",
    description: "",
    properties: [],
  });

  const [field, setField] = useState<FieldDefinition>({
    name: "",
    label: "",
    required: false,
    description: "",
    type: "string",
  });

  const handleSubmit = () => {
    createEntity(form);
    console.log("Form submitted:", form);
  };

  const handleAddField = () => {
    if (!field.name) return; // Require a name for the field
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
      <div className={styles.formGrid}>
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
      <button
        onClick={handleAddField}
        type="button"
        className={styles.addFieldButton}
      >
        Add Field
      </button>
      <div>
        <h3 className={styles.fieldsHeader}>Fields</h3>
        <ul className={styles.fieldList}>
          {form.properties.map((f, idx) => (
            <li key={idx} className={styles.fieldListItem}>
              <span>{f.name}</span> ({f.type}){f.required ? " *" : ""} -{" "}
              {f.label}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSubmit} className={styles.saveButton}>
        Save Form
      </button>
    </div>
  );
}

export default FormEditor;
