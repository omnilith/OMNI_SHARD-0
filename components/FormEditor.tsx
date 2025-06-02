"use client";

import { useState } from "react";
import { FieldDefinition, Form } from "@/core/types";
import FieldEditor from "./FieldEditor";

type FormEditorProps = {
  initialForm?: Form;
  onSave: (form: Form) => void;
};

export default function FormEditor({ initialForm, onSave }: FormEditorProps) {
  const [form, setForm] = useState<Form>(
    initialForm || {
      id: "",
      type: "Form",
      label: "",
      description: "",
      properties: {},
    }
  );

  const updateField = (fieldKey: string, def: FieldDefinition) => {
    setForm((prev) => ({
      ...prev,
      properties: {
        ...prev.properties,
        [fieldKey]: def,
      },
    }));
  };

  const removeField = (fieldKey: string) => {
    const newProps = { ...form.properties };
    delete newProps[fieldKey];
    setForm((prev) => ({ ...prev, properties: newProps }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="space-y-6">
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

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Fields</h3>
        {Object.entries(form.properties).map(([key, def]) => (
          <div key={key} className="border p-2 mb-2 rounded">
            <FieldEditor
              fieldKey={key}
              definition={def}
              onChange={(newDef) => updateField(key, newDef)}
              onDelete={() => removeField(key)}
            />
          </div>
        ))}
        <button
          className="bg-gray-200 px-3 py-1 rounded mt-2"
          onClick={() => updateField(`field${Date.now()}`, { type: "string" })}
        >
          + Add Field
        </button>
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
