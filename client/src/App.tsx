import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BoardHeader } from "./components/BoardHeader/BoardHeader";
import { BoardColumn } from "./components/BoardColumn/BoardColumn";
import { NewCardForm } from "./components/NewCardForm/NewCardForm";
import styles from "./App.module.css";
import { fetchCards, deleteCard as apiDeleteCard } from "./api/cards";

function App() {
  const queryClient = useQueryClient();

  const { data: cards = [], isLoading, isError } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });

  const deleteMutation = useMutation({
    mutationFn: apiDeleteCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Удалить эту карточку?");
    if (!confirmed) return;
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (isError) {
    return <div className={styles.error}>Ошибка загрузки карточек</div>;
  }

  return (
    <div className={styles.app}>
      <BoardHeader />
      <main className={styles.board}>
        <NewCardForm />
        <div className={styles.columns}>
          <BoardColumn cards={cards} onDelete={handleDelete} />
        </div>
      </main>
    </div>
  );
}

export default App;
