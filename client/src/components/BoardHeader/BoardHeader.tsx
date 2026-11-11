import { useBoardFilterStore } from "../../store/boardFilterStore";
import styles from "./BoardHeader.module.css";

export function BoardHeader() {
  const hideDone = useBoardFilterStore((state) => state.hideDone);
  const toggleHideDone = useBoardFilterStore((state) => state.toggleHideDone);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Канбан-доска</h1>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.filterButton}
          onClick={toggleHideDone}
        >
          {hideDone ? "Показать выполненные" : "Скрыть выполненные"}
        </button>
      </div>
    </header>
  );
}
