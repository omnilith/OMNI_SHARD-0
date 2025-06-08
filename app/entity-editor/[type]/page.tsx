import GenericEntityEditor from "@/components/GenericEntityEditor";
import { getEntityById } from "@/core/actions";
import { Form } from "@/core/types";

interface PageProps {
  params: { type: string };
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function page({ params }: PageProps) {
  const { type } = await params;
  const capitalizedType = capitalizeFirstLetter(type);
  const form = (await getEntityById("form-" + capitalizedType)) as Form;
  return (
    <div>
      <GenericEntityEditor form={form} type={capitalizedType} />
    </div>
  );
}

export default page;
