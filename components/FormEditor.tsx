"use client";

import { useState } from "react";
import { Form } from "@/core/types";
import { createEntity } from "@/core/actions";

function FormEditor() {
  const [form, setForm] = useState<Form>({
    id: "",
    type: "Form",
    label: "",
    description: "",
    properties: [],
  });
  const handleSubmit = () => {
    createEntity(form);
    console.log("Form submitted:", form);
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
