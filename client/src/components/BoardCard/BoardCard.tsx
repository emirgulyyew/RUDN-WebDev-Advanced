import { useState, useCallback } from "react";
import styles from "./BoardCard.module.css";

type BoardCardProps = {
  title: string;
  isDone: boolean;
  id: string;
  onDelete: (id: string) => void;
};

export function BoardCard({ title, isDone, id, onDelete }: BoardCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = useCallback(() => {
    if (isDeleting) return;

    const confirmed = window.confirm("Удалить эту карточку?");
    if (!confirmed) return;

    setIsDeleting(true);
    setError(null);

    onDelete(id)
      .catch((err: Error) => {
        setError(err.message);
        setIsDeleting(false);
      });
  }, [isDeleting, id, onDelete]);

  return (
    <div className={isDone ? styles.isDone : styles.card}>
      <button
        className={styles.deleteBtn}
        disabled={isDeleting}
        onClick={handleDelete}
        title="Удалить карточку"
      >
        {isDeleting ? <span className={styles.spinner} /> : "×"}
      </button>
      <span className={styles.cardTitle}>{title}</span>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
