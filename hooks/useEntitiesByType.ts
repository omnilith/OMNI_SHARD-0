// Helper hook to fetch entities by type from the API
import { useEffect, useState } from "react";
import { Entity } from "@/core/types";

export function useEntitiesByType(type?: string) {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!type) return;
    setLoading(true);
    setError(null);
    fetch(`/api/entities?type=${encodeURIComponent(type)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch entities");
        return res.json();
      })
      .then((data) => setEntities(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [type]);

  return { entities, loading, error };
}
