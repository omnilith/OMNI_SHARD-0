"use server";

import { loadForm } from "./loadForm";
import { validateAndPrepareEntity } from "./validateAndPrepareEntity";
import { RawEntity } from "./types";
import { insertEntity } from "./persistence/insertEntity";

export async function createEntity(entity: RawEntity) {
  if (typeof entity !== "object" || entity === null || !("id" in entity)) {
    throw new Error("Entity must be an object with an 'id' property");
  }

  const form = await loadForm(entity.type as string);
  const result = validateAndPrepareEntity(entity, form);
  if (result.valid) {
    return await insertEntity(result.entity);
  } else {
    throw new Error(result.error);
  }
}
