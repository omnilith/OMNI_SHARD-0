import { Entity } from "../types";
import { query } from "./db";

export async function loadEntitiesByType(type: string): Promise<Entity[]> {
  const rows = await query(`SELECT * FROM entity WHERE type = $1`, [type]);
  return rows;
}
