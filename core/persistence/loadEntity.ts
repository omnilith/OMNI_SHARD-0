import { Entity } from "../types";
import { query } from "./db";

export async function loadEntitiesByType(type: string): Promise<Entity[]> {
  const rows = await query(`SELECT * FROM entity WHERE type = $1`, [type]);
  return rows;
}

export async function loadEntityById(id: string): Promise<Entity | null> {
  const rows = await query(`SELECT * FROM entity WHERE id = $1`, [id]);
  return rows.length > 0 ? rows[0] : null;
}
