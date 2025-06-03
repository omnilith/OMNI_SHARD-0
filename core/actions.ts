"use server";

import { Entity, Form } from "./types";
import { loadEntityById } from "./persistence/loadEntity";
import { validateAndPrepareEntity } from "./validateAndPrepareEntity";
import { insertEntity } from "./persistence/insertEntity";

export const createEntity = async (entity: Entity) => {
  console.log("Creating entity:", entity);
  const form = (await loadEntityById(`form-${entity.type}`)) as Form; //TODO:  Need to add Form type to DB
  if (!form) {
    throw new Error(`Form for entity type "${entity.type}" not found`);
  }
  const validationResult = validateAndPrepareEntity(entity, form);
  if (!validationResult.valid) {
    throw new Error(validationResult.error);
  }
  const preparedEntity = validationResult.entity;
  const insertedEntity = await insertEntity(preparedEntity);
  return insertedEntity;
};
