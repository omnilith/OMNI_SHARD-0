import { loadForms } from "@/core/loadForm";
import { Form, Entity } from "@/core/types";
import { fetchEntitiesByType } from "@/core/actions";

async function FormList() {
  const forms: Form[] = loadForms();
  const forms2: Entity[] = await fetchEntitiesByType("Form");
  console.log("Forms loaded:", forms2);
  return (
    <div>
      {forms.map((form) => (
        <div key={form.id}>
          <h2>{form.label}</h2>
          <p>{form.description}</p>
          <p>{form.id}</p>
        </div>
      ))}
    </div>
  );
}

export default FormList;
