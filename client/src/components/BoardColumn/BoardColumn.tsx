import type { Card } from "../../types/card";
import { BoardCard } from "../BoardCard/BoardCard";
import styles from "./BoardColumn.module.css";

type Props = {
  cards: Card[];
  onDelete: (id: string) => void;
};

export function BoardColumn({ cards, onDelete }: Props) {
  return (
    <section className={styles.column}>
      <h2 className={styles.title}>К выполнению</h2>
      <div className={styles.cards}>
        {cards.map(card => (
          <BoardCard
            key={card.id}
            title={card.title}
            isDone={card.isDone}
            id={card.id}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
