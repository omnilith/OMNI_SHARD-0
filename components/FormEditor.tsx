"use client";

import { useState } from "react";
import { Form, FieldDefinition } from "@/core/types";
// import { createEntity } from "@/core/actions";
import FieldEditor from "./FieldEditor";

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
    // createEntity(form);
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
    <div>
      {" "}
      <div className="grid grid-cols-2 gap-4">
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
        className="bg-green-600 text-white px-3 py-1 rounded mr-2"
        onClick={handleAddField}
        type="button"
      >
        Add Field
      </button>
      <div className="my-4">
        <h3 className="font-bold">Fields</h3>
        <ul>
          {form.properties.map((f, idx) => (
            <li key={idx} className="border-b py-1 text-sm">
              <span className="font-mono">{f.name}</span> ({f.type})
              {f.required ? " *" : ""} - {f.label}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Save Form
      </button>
    </div>
  );
}

export default FormEditor;
