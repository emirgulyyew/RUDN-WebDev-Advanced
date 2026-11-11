import express from "express";

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

app.get("/cards", (req, res) => {
  res.json(cards);
});

app.listen(3001, () => {
  console.log("Сервер запущен: http://localhost:3001");
});
