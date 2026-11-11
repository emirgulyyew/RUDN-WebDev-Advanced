import express from "express";
import type { Request, Response, NextFunction } from "express";

type Card = {
  id: string;
  title: string;
  isDone: boolean;
  isUrgent?: boolean;
};

const cards: Card[] = [
  { id: "1", title: "Спроектировать структуру доски", isDone: true, isUrgent: false },
  { id: "2", title: "Подключить доску к серверу", isDone: false, isUrgent: true },
  { id: "3", title: "Добавить фильтр выполненных карточек", isDone: false, isUrgent: false },
];

const app = express();

app.use(express.json());

app.get("/cards", (req, res) => {
  res.json(cards);
});

app.post("/cards", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    res.status(400).json({ error: "title обязателен и не может быть пустым" });
    return;
  }

  const newCard: Card = {
    id: String(Date.now()),
    title: title.trim(),
    isDone: false,
    isUrgent: false,
  };

  cards.push(newCard);
  res.status(201).json(newCard);
});

app.delete("/cards/:id", (req, res) => {
  const index = cards.findIndex((card) => card.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ error: "Карточка не найдена" });
    return;
  }

  const [deletedCard] = cards.splice(index, 1);
  res.status(200).json(deletedCard);
});

app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

app.listen(3001, () => {
  console.log("Сервер запущен: http://localhost:3001");
});
