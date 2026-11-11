## Why

Нужно технически обосновать выбор React Query для удаления карточек и описать архитектуру решения до начала реализации.

## Architecture

### Выбор: React Query (useMutation)

Проект уже использует `@tanstack/react-query` (v5) через `QueryClientProvider` в `main.tsx`. Для удаления используем `useMutation`, а не `useEffect` + ручной `fetch`, потому что:
- React Query автоматически инвалидирует кэш по ключу — не нужно вручную вызывать `fetchCards` после удаления.
- Встроенные состояния `isPending`, `isError`, `error` — не нужно добавлять лишний `useState`.
- Повторные попытки (retry) и обработка ошибок централизованы.

### Ключ инвалидации

После успешного удаления вызываем `queryClient.invalidateQueries({ queryKey: ["cards"] })`, чтобы:
- Запрос `fetchCards()` в следующем рендере забрал обновлённый список с сервера.
- Все компоненты, использующие `useQuery(["cards"])`, автоматически обновятся.

### Подтверждение

Используем `window.confirm()` — минимальный оверхед, нативный диалог, не требует дополнительных UI-компонентов.

### Цепочка пропсов

```
App (state + useMutation)
  → BoardColumn (passes id + onDelete)
    → BoardCard (renders delete button + calls onDelete(id))
```

### Состояния кнопки

| Состояние | Поведование |
|---|---|
| **Idle** | Показывает иконку корзины/крестика |
| **Pending** | disabled, показывает спиннер (CSS-анимация) |
| **Error** | Показывает тултип/текст с ошибкой, кнопка разблокирована |

### Стили

Кнопка удаления — всегда видимая (без hover), позиционирование `absolute` в правом верхнем углу карточки. Цвет — нейтральный (например, `--text-muted`), при hover — краснеет для индикации деструктивного действия.

## Components

### client/src/api/cards.ts

Добавить функцию:

```ts
export async function deleteCard(id: string): Promise<void> {
  const response = await fetch(`/api/cards?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const status = response.status;
    if (status === 404) throw new Error("Карточка не найдена");
    throw new Error("Не удалось удалить карточку");
  }
}
```

### client/src/components/BoardCard/BoardCard.tsx

Добавить пропсы:
- `id: string` — идентификатор карточки
- `onDelete: (id: string) => void` — колбек удаления

Добавить кнопку с `className={styles.deleteBtn}`, внутри — символ `×` или SVG-иконка корзины.

### client/src/components/BoardColumn/BoardColumn.tsx

Добавить пропсы:
- `onDelete: (id: string) => void` — передаём вниз в `BoardCard`

### client/src/App.tsx

- Заменить хардкод-массив на `useQuery(["cards"], fetchCards)`.
- Создать `useMutation` с `deleteCard` + инвалидацией `["cards"]`.
- Обернуть вызов в `window.confirm()`.
- Передать `onDelete` в `BoardColumn`.

## Risks

- **Сервер принимает `id` через query-параметр, а не body.** Это учтено в `deleteCard` (id в URL).
- **Конкурентное удаление.** React Query обрабатывает race condition через инвалидацию — безопасно.
- **Удаление несуществующей карточки.** Сервер возвращает 404, React Query перехватит ошибку через `onError`.
