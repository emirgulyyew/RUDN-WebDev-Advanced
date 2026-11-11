## Why

На доске нет возможности удалять карточки. Пользователь может создавать и просматривать карточки, но не может их удалить, что ограничивает функциональность доски и не позволяет очищать завершённые или неактуальные задачи.

## What Changes

- Добавить функцию `deleteCard(id)` в клиентское API (`client/src/api/cards.ts`), вызывающую `DELETE /api/cards?id=<id>`.
- Добавить кнопку удаления (крестик `×`) в компонент `BoardCard`, всегда видимую (без hover).
- Передавать `id` карточки и колбек `onDelete` через цепочку `BoardCard → BoardColumn → App`.
- Реализовать подтверждение удаления через `window.confirm()` перед отправкой на сервер.
- Реализовать удаление через React Query `useMutation` с инвалидацией ключа `["cards"]`.
- Реализовать состояние загрузки (`isPending`) при удалении — кнопка блокируется, показывается спиннер.
- Реализовать обработку ошибки — отображение сообщения об ошибке.
- Заменить хардкод-массив карточек в `App.tsx` на `useQuery(["cards"], fetchCards)`.

### Capabilities

#### New Capabilities
- `board-card-delete`: Кнопка удаления карточки в компоненте `BoardCard` с подтверждением, состоянием загрузки и обработкой ошибок.

#### Modified Capabilities
- *(нет)*

## Impact

- `client/src/api/cards.ts` — добавление функции `deleteCard(id)`.
- `client/src/components/BoardCard/BoardCard.tsx` — добавление кнопки удаления, пропсов `id` и `onDelete`.
- `client/src/components/BoardCard/BoardCard.module.css` — стили для кнопки удаления и состояния загрузки.
- `client/src/components/BoardColumn/BoardColumn.tsx` — передача `id` и `onDelete` в `BoardCard`.
- `client/src/App.tsx` — добавление состояния карточек, функции удаления, обновление списка после удаления.
