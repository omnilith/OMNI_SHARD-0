"use server";

import { Entity, DBEntity, Form } from "./types";
import { loadEntityById, loadEntitiesByType } from "./persistence/loadEntity";
import { validateAndPrepareEntity } from "./validateAndPrepareEntity";
import { insertEntity } from "./persistence/insertEntity";

export const createEntity = async (entity: Entity) => {
  const loadedForm = await loadEntityById(`form-${entity.type}`); //TODO:  Need to add Form type to DB
  if (!loadedForm) {
    throw new Error(`Form for entity type "${entity.type}" not found`);
  }
  const form = toAppEntity(loadedForm) as Form;

  const validationResult = validateAndPrepareEntity(entity, form);
  if (!validationResult.valid) {
    throw new Error(validationResult.error);
  }
  const preparedEntity = validationResult.entity;
  const insertedEntity = await insertEntity(preparedEntity);
  return insertedEntity;
};

export const getEntityById = async (id: string): Promise<Entity | null> => {
  const dbRow = await loadEntityById(id);
  if (!dbRow) {
    return null;
  }
  return toAppEntity(dbRow);
};

export const getEntitiesByType = async (type: string): Promise<Entity[]> => {
  const dbRows = await loadEntitiesByType(type);
  return dbRows.map(toAppEntity);
};

function toAppEntity(dbRow: DBEntity): Entity {
  return { id: dbRow.id, type: dbRow.type, ...dbRow.essence };
}

// function toDbRow(appEntity) {
//   const { id, type, ...data } = appEntity;
//   return { id, type, data };
// }
