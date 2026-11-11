## Task 1 — Клиентское API: функция deleteCard

- [x] Добавить функцию `deleteCard(id)` в `client/src/api/cards.ts`.

**Цель:** Добавить функцию `deleteCard(id)` в `client/src/api/cards.ts`.

**Что сделать:**
- Добавить функцию `deleteCard(id: string): Promise<void>`, вызывающую `DELETE /api/cards?id=<id>`.
- Обработать статусы: 204 — успех, 404 — выбросить `Error("Карточка не найдена")`, остальные — `Error("Не удалось удалить карточку")`.
- **Не трогать** `fetchCards`, `createCard`, другие файлы.

**Критерии готовности:** Функция экспортируется, типизирована, бэкенд-маршрут `DELETE /cards?id=...` вызывается корректно.

---

## Task 2 — Компонент BoardCard: кнопка удаления

**Цель:** Добавить кнопку удаления в `BoardCard` с состояниями idle / pending / error.

**Что сделать:**
- Добавить пропсы `id: string` и `onDelete: (id: string) => void` в `BoardCardProps`.
- Добавить кнопку с крестиком (`×`) в правый верхний угол карточки (`position: absolute`).
- Реализовать CSS: кнопка всегда видна, при hover — краснеет.
- Состояние pending: кнопка `disabled`, показывать спиннер (CSS-анимация `@keyframes spin`).
- Состояние error: показать текст ошибки рядом с кнопкой (опционально, можно просто console.error).
- **Не трогать** `BoardColumn`, `App`, другие файлы.

**Критерии готовности:** Кнопка рендерится, стилизована, принимает `id` и `onDelete`, блокируется при pending.

---

## Task 3 — Передача id и onDelete через BoardColumn

**Цель:** Пропустить `id` и `onDelete` от `BoardColumn` до `BoardCard`.

**Что сделать:**
- Добавить пропсы `onDelete: (id: string) => void` в `BoardColumnProps`.
- Передать `card.id` и `onDelete` в `<BoardCard>` при рендеринге.
- **Не трогать** `App`, `BoardCard.module.css`, другие файлы.

**Критерии готовности:** `BoardColumn` принимает `onDelete`, передаёт его и `card.id` в каждый `BoardCard`.

---

## Task 4 — App: useMutation + useQuery + window.confirm

**Цель:** Подключить React Query для загрузки карточек и удаления через useMutation.

**Что сделать:**
- Заменить хардкод-массив карточек на `useQuery(["cards"], fetchCards)`.
- Создать `useMutation` с функцией `deleteCard` из API.
- В `mutation.mutate` сначала вызвать `window.confirm()`, если отмена — не вызывать API.
- После успешного удаления — инвалидация `["cards"]` через `queryClient.invalidateQueries`.
- Обработка ошибки: показать alert или console.error.
- Передать `onDelete` в `BoardColumn`.
- Обработать состояния `isLoading` и `isError` из `useQuery`.

**Критерии готовности:** Карточки загружаются с сервера, удаление работает через `window.confirm` + `useMutation`, список обновляется после удаления, ошибки обрабатываются.
