"use client";

import FormList from "@/components/FormList";
import FormEditor from "@/components/FormEditor";
import { createEntity } from "@/core/actions";

export default function page() {
  return (
    <div>
      <FormList />
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
}
