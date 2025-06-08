import { query } from "./db";

export async function deleteEntity(id: string): Promise<{ success: boolean }> {
  await query(`DELETE FROM entity WHERE id = $1`, [id]);

  return { success: true };
}
