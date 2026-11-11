import { useQuery } from "@tanstack/react-query";
import { BoardHeader } from "./components/BoardHeader/BoardHeader";
import { BoardColumn } from "./components/BoardColumn/BoardColumn";
import { NewCardForm } from "./components/NewCardForm/NewCardForm";
import { fetchCards } from "./api/cards";
import styles from "./App.module.css";

function App() {
  const { data: cards = [], isLoading, isError } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });

  if (isLoading) return <div className={styles.app}>Загрузка...</div>;
  if (isError) return <div className={styles.app}>Ошибка загрузки карточек</div>;

  return (
    <div className={styles.app}>
      <BoardHeader />
      <main className={styles.board}>
        <NewCardForm />
        <BoardColumn cards={cards} />
      </main>
    </div>
  );
}

export default App;
