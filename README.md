# Apollo GraphQL Users Management

[![Coverage Status](https://img.shields.io/badge/coverage-100%25-brightgreen)](./server/coverage/lcov-report/index.html)
![Node.js](https://img.shields.io/badge/node-%3E=18.0.0-green)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

Полнофункциональное приложение для управления пользователями с использованием GraphQL, Apollo Server, React и Redux Toolkit.

## 🚀 Технологии

### Backend
- **Node.js** + **TypeScript**
- **Apollo Server** - GraphQL сервер
- **GraphQL** - API запросы
- **Jest** - тестирование
- **ESLint** + **Prettier** - качество кода

### Frontend
- **React** + **TypeScript**
- **Redux Toolkit** + **RTK Query** - управление состоянием
- **Tailwind CSS** - стилизация
- **FSD (Feature-Sliced Design)** - архитектура
- **Vite** - сборка

## 📁 Структура проекта

```
apollo-graphql/
├── server/                 # GraphQL сервер
│   ├── src/
│   │   ├── entities/       # Бизнес-сущности
│   │   ├── resolvers/      # GraphQL резолверы
│   │   ├── schema/         # GraphQL схема
│   │   └── types/          # TypeScript типы
│   └── tests/              # Тесты
├── client/                 # React приложение
│   ├── src/
│   │   ├── app/           # Конфигурация приложения
│   │   ├── entities/      # Бизнес-сущности
│   │   ├── features/      # Функциональность
│   │   ├── pages/         # Страницы
│   │   ├── shared/        # Общие компоненты
│   │   └── widgets/       # Виджеты
│   └── public/            # Статические файлы
└── package.json           # Корневой package.json
```

## 🛠 Установка и запуск

### 1. Установка зависимостей
```bash
npm run install:all
```

### 2. Запуск в режиме разработки
```bash
# Запуск сервера и клиента одновременно
npm run dev

# Или по отдельности
npm run dev:server  # Сервер на http://localhost:4000
npm run dev:client  # Клиент на http://localhost:5173
```

### 3. Сборка для продакшена
```bash
npm run build
```

### 4. Запуск сервера
```bash
npm start
```

## 🧪 Тестирование

```bash
# Все тесты
npm test

# Тесты сервера
npm run test:server

# Тесты клиента
npm run test:client
```

## 📝 Качество кода

```bash
# Линтинг
npm run lint

# Форматирование
npm run format
```

## 🎯 Функциональность

### Backend (GraphQL API)
- ✅ **Query**: получение списка пользователей
- ✅ **Query**: получение пользователя по ID
- ✅ **Query**: поиск пользователей по имени (нестрогое совпадение)
- ✅ **Query**: фильтрация пользователей (по имени, возрасту, семейному положению)
- ✅ **Mutation**: создание нового пользователя
- ✅ **Mutation**: удаление пользователя
- ✅ **Mutation**: редактирование пользователя
- ✅ **TypeScript**: полная типизация
- ✅ **Тесты**: покрытие кода 100%

### Frontend (React App)
- ✅ **Список пользователей**: отображение всех пользователей
- ✅ **Выбор пользователя**: клик для выбора и просмотра деталей
- ✅ **Создание пользователя**: модальное окно с формой
- ✅ **Удаление пользователя**: кнопка удаления
- ✅ **Редактирование пользователя**: форма редактирования
- ✅ **Поиск пользователей**: поиск по имени в реальном времени
- ✅ **Фильтрация пользователей**: по имени, возрасту, семейному положению
- ✅ **Адаптивный дизайн**: работает на всех устройствах
- ✅ **FSD архитектура**: четкое разделение слоев
- ✅ **Redux Toolkit**: управление состоянием
- ✅ **RTK Query**: GraphQL запросы

## 🎨 UI/UX

- **Современный дизайн** с Tailwind CSS
- **Модальные окна** для создания пользователей
- **Адаптивная сетка** для карточек
- **Визуальная обратная связь** при выборе
- **Состояния загрузки** и ошибок
- **Плавные анимации** и переходы

## 📊 GraphQL Schema

```graphql
type Query {
  getUsers: [User!]!
  getUserById(id: ID!): User
  searchUsers(searchTerm: String!): [User!]!
  filterUsers(input: FilterUsersInput!): [User!]!
}

type Mutation {
  createUser(name: String!, age: Int!, isMarried: Boolean!): User!
  deleteUserById(id: ID!): [User!]!
  editUserById(input: UpdateUserInput!): [User!]!
}

type User {
  id: ID!
  name: String!
  age: Int!
  isMarried: Boolean!
}

input UpdateUserInput {
  id: ID!
  newName: String
  newAge: Int
  isMarriedStatusChanged: Boolean
}

input FilterUsersInput {
  nameSearch: String
  ageFrom: Int
  ageTo: Int
  isMarried: Boolean
}
```

## 🔧 Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск сервера и клиента |
| `npm run build` | Сборка проекта |
| `npm run test` | Запуск всех тестов |
| `npm run lint` | Проверка кода |
| `npm run format` | Форматирование кода |

## 📈 Покрытие тестами

- **Backend**: 100% покрытие резолверов и схемы
- **Frontend**: компоненты покрыты тестами

## 🚀 Развертывание

1. Соберите проект: `npm run build`
2. Запустите сервер: `npm start`
3. Откройте клиент в браузере

## 📝 Лицензия

MIT 

## 🚀 Деплой на Render

### Backend (Apollo GraphQL Server)
- Web Service
- Root: `/server`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Env: (ничего не нужно, Render сам задаёт PORT)

### Frontend (React/Vite)
- Static Site
- Root: `/client`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Env: `VITE_API_URL=https://your-backend.onrender.com/graphql`

### Порядок действий
1. Деплой backend (Web Service, root: `/server`).
2. После деплоя Render покажет публичный URL сервера.
3. В `/client/.env` пропиши этот URL как `VITE_API_URL`.
4. Деплой frontend (Static Site, root: `/client`).
5. Готово! 