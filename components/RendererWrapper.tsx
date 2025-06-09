import { getEntityById, getEntitiesByType } from "@/core/actions";
import TableRenderer from "./TableRenderer";
import ListRenderer from "./ListRenderer";

interface RendererWrapperProps {
  viewId: string;
}

async function RendererWrapper({ viewId }: RendererWrapperProps) {
  // Fetch the entity by ID
  const view = await getEntityById(viewId);
  if (!view) {
    return <div>view not found</div>;
  }
  const entities = await getEntitiesByType(view.targetEntityType as string);
  const layout = view.rendererComponent ?? view.layout;
  switch (layout) {
    case "table":
      return <TableRenderer />;
    case "list":
      return <ListRenderer entities={entities} />;
    default:
      return <div>⚠️ No renderer found for layout</div>;
  }
}

export default RendererWrapper;
