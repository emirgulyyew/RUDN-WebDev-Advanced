import { useState } from "react";
import styles from "./NewCardForm.module.css";

export function NewCardForm() {
  const [title, setTitle] = useState("");
  const [touched, setTouched] = useState(false);

  const isEmpty = title.trim() === "";

  const handleBlur = () => {
    setTouched(true);
  };

  const handleAdd = () => {
    setTouched(true);
    if (!isEmpty) {
      // TODO: добавить карточку
    }
  };

  return (
    <div className={styles.form}>
      <input
        className={`${styles.input} ${touched && isEmpty ? styles["input--error"] : ""}`}
        placeholder="Название карточки"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleBlur}
      />
      <button
        className={styles.button}
        type="button"
        disabled={isEmpty}
        onClick={handleAdd}
      >
        Добавить
      </button>
      {touched && isEmpty && (
        <span className={styles.error}>Введите название карточки</span>
      )}
    </div>
  );
}
