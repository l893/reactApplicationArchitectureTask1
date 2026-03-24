# Rick & Morty — Router + Auth + FSD + Material UI

Учебное приложение для закрепления **React Router (Data Router)**, **React Context API** и наведения порядка в архитектуре по принципам **Feature-Sliced Design (FSD)** на примере вселенной **Rick & Morty**.

Данные загружаются из **Rick & Morty API**:

- https://rickandmortyapi.com/api/character
- https://rickandmortyapi.com/api/location
- https://rickandmortyapi.com/api/episode

## Цель задачи

Репозиторий основан на https://github.com/l893/reactOptimisationTask1 и переработан по условиям:

1. Использовать **Material UI**
2. Перестроить проект под **Feature-Sliced Design (FSD)**

## Возможности

- ✅ Страница **Login** (`/login`) использует UI фичи `auth` (`Signin`, `Wrapper`) и кастомный `Input` из `shared/ui`
- 🔐 Приватные маршруты:
  - `/:category`
  - `/:category/:id`
- ↩️ Redirect после авторизации на исходный URL (с сохранением `pathname + search`, например `?sort=asc`)
- 🚪 Logout в Navbar (сбрасывает авторизацию и переводит на `/login`)
- 💾 Авторизация хранится в `localStorage`, управление — через **Context API**
- 🧩 Lazy loading страниц: `React.lazy()` + `Suspense` (через кастомный `lazyImport`)
- 🧯 Error Boundary: оборачивает только контент приложения (Navbar всегда доступен)
- ♾️ Infinite Scroll: `IntersectionObserver` подгружает следующую страницу и добавляет элементы в конец списка
- 🔁 Отмена запросов: `AbortController` при смене параметров/размонтаже
- ↕️ Сортировка по дате создания (ASC/DESC) через query-параметр `?sort=asc|desc`

## Использовано

- React `19.x` (в том числе контекст через `use()`)
- React Router DOM `7.x` (Data Router)
- Vite
- Material UI (`@mui/material`) + Emotion (`@emotion/react`, `@emotion/styled`)
- `React.lazy()` + `Suspense`
- `IntersectionObserver` (infinite scroll)
- `AbortController` (отмена запросов)

## Роуты

### Public

- `/` — Home
- `/login` — Login
- `/404` — NotFound
- `*` — NotFound

### Private (только после логина)

- `/:category` — Category page
- `/:category/:id` — Detail page

## Как работает авторизация

- `AuthProvider` хранит `isAuthenticated` в контексте и синхронизируется с `localStorage`
- `RequireAuth` защищает приватные маршруты:
  - если пользователь не авторизован → редирект на `/login`
  - сохраняет исходный маршрут в `location.state.from`
- После логина происходит редирект обратно на исходный URL (включая query-параметры)

## Архитектура (Feature-Sliced Design)

Проект организован по слоям:

- `src/app/` — инициализация приложения: роутер, layout, error boundary, глобальные fallbacks
- `src/pages/` — страницы (route-level composition): `home / category / detail / login / not-found`
- `src/widgets/` — крупные блоки интерфейса (например, `navbar`)
- `src/features/` — фичи:
  - `auth/` — контекст, провайдер, guard, storage, **ui** (`Signin`, `Wrapper`)
  - `infinite-scroll/` — хук `useInfiniteScroll`
  - `category-pagination/` — хук `useCategoryPagination` (загрузка страниц категории, paging state, abort, ошибки)
- `src/entities/` — доменная сущность Rick & Morty:
  - `rick-morty/api` — запросы `fetchCategoryPage`, `fetchItemById`
  - `rick-morty/model` — список категорий, поля для detail-страницы
- `src/shared/` — переиспользуемые примитивы:
  - `shared/api` — http-client (`fetchJson`, `ApiError`, `isAbortError`)
  - `shared/lib` — `lazyImport`, `LazyBoundary`
  - `shared/ui` — UI-примитивы и состояния: `LoadingState/ErrorState/EmptyState` + `SortControls` + **кастомный Input**
  - `shared/theme` — тема MUI
  - `shared/config` — общие ключи/конфиги

### Алиасы импортов

Используются алиасы из `jsconfig.json`:
`@app`, `@pages`, `@features`, `@widgets`, `@entities`, `@shared`.

## Manual check (quick QA)

1. **Гость → приватная категория**
   - Открой: `/characters?sort=asc`
   - ✅ редирект на `/login`

2. **Логин с пустыми полями**
   - На `/login` нажми “Войти” с пустыми полями
   - ✅ остаёшься на `/login`, показываются ошибки, `isAuthenticated` не становится `true`

3. **Логин → возврат на исходный URL (с сохранением `?sort=`)**
   - Введи email/password и нажми “Войти”
   - ✅ возвращает на исходный URL (например `/characters?sort=asc`)

4. **Гость → приватная детальная**
   - Открой: `/characters/1`
   - ✅ редирект на `/login`
   - После логина: ✅ возврат на `/characters/1` (или точный URL)

5. **Logout**
   - Нажми `Logout` в Navbar
   - ✅ переход на `/login`
   - ✅ приватные роуты снова недоступны

6. **Infinite Scroll**
   - Открой `/characters`, прокрути вниз
   - ✅ подгружаются новые страницы, пока они есть

## Запуск

```bash
npm install
npm run dev
```
