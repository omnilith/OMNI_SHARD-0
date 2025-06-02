import { forms } from "./data";
import { Form } from "./types";

export function loadForms(): Form[] {
  return forms;
}

export async function loadForm(id: string): Promise<Form | undefined> {
  return forms.find((form) => form.id === id);
}
