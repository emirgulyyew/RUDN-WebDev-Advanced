import type { Card } from "../../types/card";
import { BoardCard } from "../BoardCard/BoardCard";
import { useBoardFilterStore } from "../../store/boardFilterStore";
import styles from "./BoardColumn.module.css";

type Props = {
  cards: Card[];
};

export function BoardColumn(props: Props) {
  const hideDone = useBoardFilterStore((state) => state.hideDone);

  const visibleCards = hideDone
    ? props.cards.filter((card) => !card.isDone)
    : props.cards;

  return (
    <section className={styles.column}>
      <h2 className={styles.title}>К выполнению</h2>
      <div className={styles.cards}>
        {visibleCards.map((card) => (
          <BoardCard
            key={card.id}
            title={card.title}
            isDone={card.isDone}
          />
        ))}
      </div>
    </section>
  );
}
