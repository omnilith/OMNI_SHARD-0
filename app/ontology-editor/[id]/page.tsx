import FormEditor from "@/components/FormEditor";
import { getEntityById } from "@/core/actions";
import { Form } from "@/core/types";

interface PageProps {
  params: { id: string };
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const entity = (await getEntityById(id)) as Form;

  return (
    <div>
      <FormEditor initialForm={entity} />
    </div>
  );
}
