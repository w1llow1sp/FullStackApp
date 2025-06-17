import  {ApolloServer} from "@apollo/server";
import  {startStandaloneServer} from "@apollo/server/standalone";

/**
 * Основы GraphQL и его использование в приложении
 *
 * GraphQL — это мощный инструмент для создания API, который выступает в качестве промежуточного слоя
 * между фронтендом и бэкендом. Он позволяет стандартизировать и структурировать данные, обеспечивая
 * гибкость в запросах и мутациях. В ядре GraphQL лежат два ключевых элемента:
 *
 * ### 1. Query (Запрос)
 * - **Описание**: Определяет все поля и типы данных, доступные в API для чтения.
 * - **Назначение**: Используется для получения данных (операция READ в терминах CRUD).
 * - **Пример**: Запрос на получение информации о пользователе, возвращающий только указанные поля
 *   (например, `name` и `email`).
 *
 * ### 2. Mutation (Мутация)
 * - **Описание**: Определяет операции, которые изменяют данные на сервере.
 * - **Назначение**: Используется для создания, обновления или удаления данных
 *   (операции CREATE, UPDATE, DELETE в терминах CRUD).
 * - **Пример**: Мутация для создания нового пользователя или изменения статуса задачи.
 *
 * ### Роль GraphQL
 * - GraphQL не является полноценным сервером или базой данных, а представляет собой слой,
 *   который помогает стандартизировать взаимодействие между клиентом и сервером.
 * - Он позволяет четко определять типы данных, запросы и мутации, упрощая их использование
 *   на фронтенде и бэкенде.
 *
 * ### Использование Apollo Server
 * - Библиотека `ApolloServer` автоматизирует большую часть работы с GraphQL на серверной стороне.
 * - На бэкенде необходимо:
 *   1. Определить структуру данных (типы).
 *   2. Создать запросы (`Query`) для получения данных.
 *   3. Создать мутации (`Mutation`) для изменения данных.
 *
 * ### TypeDefs
 * - Переменная `typeDefs` используется для определения схемы GraphQL.
 * - Она содержит описание всех типов, запросов и мутаций с использованием специальной
 *   нотации GraphQL.
 * - **Примечание**: `typeDefs` только описывает структуру данных, но не определяет логику
 *   их обработки.
 *
 * ### Resolvers
 * - Для каждого запроса или мутации необходимо создать функцию-резолвер, которая определяет,
 *   как API будет обрабатывать данные.
 * - **Пример**:
 *   - Для запроса на получение данных о пользователе резолвер извлекает данные из базы.
 *   - Для мутации создания пользователя резолвер выполняет логику сохранения в базу.
 *
 * ### Связь с HTTP (CRUD)
 * - `Query`: Соответствует операции `READ` (чтение данных).
 * - `Mutation`: Соответствует операциям `CREATE`, `UPDATE`, `DELETE` (изменение данных).
 *
 * Таким образом, GraphQL с Apollo Server предоставляет мощный и гибкий способ организации API,
 * упрощая взаимодействие между клиентом и сервером.
 */

// DB-Like
const users = [
    { id: "1", name: "John Doe", age: 30, isMarried: true },
    { id: "2", name: "Jane Smith", age: 25, isMarried: false },
    { id: "3", name: "Alice Johnson", age: 28, isMarried: false },
];

const typeDefs = `
    type Query {
    getUsers:[User]
    getUserById(id:ID!):User
    }
    
    type Mutation {
        createUser(name: String!, age:Int!, isMarried:Boolean!):User
    }
    
    type User {
        id:ID
        name:String
        age:Int
        isMarried:Boolean
    }
`
const resolvers = {
    Query: {
        getUsers: () => {
            return users;
        },
        getUserById: (parent, args) => {
            const id = args.id;
            return users.find(user => user.id === id);
        }
    },
    Mutation: {
        createUser: (parent, args) => {
            const { name, age, isMarried } = args;
            const newUser = {
                id:(users.length + 1).toString(),
                name,
                age,
                isMarried
            }
            users.push(newUser);
        }
    },
}


const server = new ApolloServer({typeDefs, resolvers})
const {url} = await startStandaloneServer(server,{
    listen:{port:4000}
})

console.log(`Server started at ${url}`);

