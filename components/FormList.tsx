import { loadForms } from "@/core/loadForm";
import { Form } from "@/core/types";

function FormList() {
  const forms: Form[] = loadForms();
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
