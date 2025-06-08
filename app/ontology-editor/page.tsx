import FormEditor from "@/components/FormEditor";
import FormList from "@/components/FormList";

export default async function page() {
  return (
    <div>
      <FormEditor />
      <FormList />
    </div>
  );
}
