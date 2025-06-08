import { getEntitiesByType } from "@/core/actions";
import { Form } from "@/core/types";
import styles from "./FormList.module.css";

async function FormList() {
  const forms = (await getEntitiesByType("Form")) as Form[];
  if (!forms || forms.length === 0) {
    return <div className={styles.formListContainer}>No forms available</div>;
  }

  return (
    <div className={styles.formListContainer}>
      {forms.map((form) => (
        <div key={form.id} className={styles.formItem}>
          <h2 className={styles.formLabel}>{form.label}</h2>
          <p className={styles.formDescription}>{form.description}</p>
          <p className={styles.formId}>{form.id}</p>
        </div>
      ))}
    </div>
  );
}

export default FormList;
