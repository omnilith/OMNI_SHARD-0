import { Form } from "@/core/types";

async function FormList({ forms }: { forms: Form[] }) {
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
