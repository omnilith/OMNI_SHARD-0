"use client";

import FormList from "@/components/FormList";
import FormEditor from "@/components/FormEditor";

export default function page() {
  return (
    <div>
      <FormList />
      <FormEditor
        onSave={(form) => {
          console.log("Create new Form:", form);
          // validateAndPrepareEntity(form, formForm) + persist to DB
        }}
      />
    </div>
  );
}
