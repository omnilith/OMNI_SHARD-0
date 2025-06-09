import { Entity } from "@/core/types";

interface ListRendererProps {
  entities: Entity[];
}

function ListRenderer({ entities }: ListRendererProps) {
  return (
    <div>
      {entities.length === 0 ? (
        <div style={{ color: "#888", fontStyle: "italic" }}>
          No entities to display.
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {entities.map((entity, idx) => (
            <li
              key={entity.id || idx}
              style={{
                border: "1px solid #eee",
                borderRadius: 6,
                margin: "0.5em 0",
                padding: "0.75em",
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 4 }}>
                ID: {entity.id}
              </div>
              <div style={{ fontWeight: 500, color: "#666", marginBottom: 4 }}>
                Type: {entity.type}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {Object.entries(entity)
                  .filter(([key]) => key !== "id" && key !== "type")
                  .map(([key, value]) => (
                    <div key={key}>
                      <span style={{ fontWeight: 500 }}>{key}:</span>{" "}
                      <span style={{ color: "#333" }}>
                        {typeof value === "object"
                          ? JSON.stringify(value)
                          : String(value)}
                      </span>
                    </div>
                  ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListRenderer;
