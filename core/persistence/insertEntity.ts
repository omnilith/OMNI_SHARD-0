import { query } from "./db";
import { Entity } from "../types";

export async function insertEntity(entity: Entity) {
  const { id, type, ...data } = entity;

  await query(
    `INSERT INTO entity (id, type, essence)
       VALUES ($1, $2, $3)
       ON CONFLICT (id) DO UPDATE SET
         type = EXCLUDED.type,
         essence = EXCLUDED.essence,
         updated_at = now()`,
    [id, type, data]
  );

  return { success: true, id };
}
