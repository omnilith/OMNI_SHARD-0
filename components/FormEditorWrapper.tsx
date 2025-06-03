"use client";

import FormEditor from "./FormEditor";
import { createEntity } from "@/core/actions";

const FormEditorWrapper: React.FC = () => {
  return (
    <div>
      <h2>Form Editor</h2>
      <FormEditor
        onSave={(form) => {
          console.log("Create new Form:", form);
          createEntity(form).then((result) => {
            if (result.success) {
              console.log("Form created successfully:", result.id);
            } else {
              console.error("Error creating form:", result.success);
            }
          });
        }}
      />
    </div>
  );
};

export default FormEditorWrapper;
