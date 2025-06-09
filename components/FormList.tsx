import { getEntitiesByType } from "@/core/actions";
import { Form } from "@/core/types";
import styles from "./FormList.module.css";
import { deleteEntityById } from "@/core/actions";
import Link from "next/link";

async function FormList() {
  const forms = (await getEntitiesByType("Form")) as Form[];
  if (!forms || forms.length === 0) {
    return <div className={styles.formListContainer}>No forms available</div>;
  }

  return (
    <div className={styles.formListContainer}>
      {forms.map((form) => (
        <div key={form.id} className={styles.formItem}>
          <div className={styles.formRow}>
            <div className={styles.formInfo}>
              <h2 className={styles.formLabel}>
                <Link
                  href={`/ontology-editor/${form.id}`}
                  className={styles.formLabelLink}
                >
                  {form.label}
                </Link>
              </h2>
              <p className={styles.formDescription}>{form.description}</p>
              <p className={styles.formId}>{form.id}</p>
            </div>
            <form
              action={async () => {
                "use server";
                await deleteEntityById(form.id);
              }}
              className={styles.deleteForm}
            >
              <button type="submit" className={styles.deleteButton}>
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormList;
