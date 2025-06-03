import FormList from "@/components/FormList";
import FormEditorWrapper from "@/components/FormEditorWrapper";
import { Form } from "@/core/types";

export default async function page() {
  console.log("Rendering Form Editor Page");
  const data = await fetch("http://localhost:3000/api/entities?type=Form");
  console.log("Fetched data:", data);
  const forms: Form[] = await data.json();

  return (
    <div>
      <FormList forms={forms} />
      <FormEditorWrapper />
    </div>
  );
}
