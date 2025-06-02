import { loadEntitiesByType } from "@/core/persistence/loadEntity";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const type = url.searchParams.get("type"); // Extract 'type' from query params

  if (!type) {
    return NextResponse.json(
      { error: "Missing 'type' query parameter" },
      { status: 400 }
    );
  }

  const entity = await loadEntitiesByType(type);
  return NextResponse.json(entity);
};
