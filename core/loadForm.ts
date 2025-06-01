import { forms } from "./data";
import { Form } from "./types";

export async function loadForms(): Promise<Form[]> {
  return forms;
}
