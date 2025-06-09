import RendererWrapper from "@/components/RendererWrapper";

interface PageProps {
  params: { id: string };
}

export default async function page({ params }: PageProps) {
  const { id } = await params;

  return (
    <div>
      <RendererWrapper viewId={id} />
    </div>
  );
}
