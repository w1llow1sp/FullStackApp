# Apollo GraphQL Users Management

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
- ✅ **Mutation**: создание нового пользователя
- ✅ **TypeScript**: полная типизация
- ✅ **Тесты**: покрытие кода 100%

### Frontend (React App)
- ✅ **Список пользователей**: отображение всех пользователей
- ✅ **Выбор пользователя**: клик для выбора и просмотра деталей
- ✅ **Создание пользователя**: модальное окно с формой
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
}

type Mutation {
  createUser(name: String!, age: Int!, isMarried: Boolean!): User!
}

type User {
  id: ID!
  name: String!
  age: Int!
  isMarried: Boolean!
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