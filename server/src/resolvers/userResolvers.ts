import {User, CreateUserInput, UpdateUserInput,} from '../types/user.js';

// In-memory database
export const users: User[] = [
    {id: "1", name: "John Doe", age: 30, isMarried: true},
    {id: "2", name: "Jane Smith", age: 25, isMarried: false},
    {id: "3", name: "Alice Johnson", age: 28, isMarried: false},
];

export const userResolvers = {
    Query: {
        getUsers: (): User[] => {
            return users;
        },
        getUserById: (_: unknown, {id}: { id: string }): User | undefined => {
            return users.find(user => user.id === id);
        }
    },
    Mutation: {
        createUser: (_: unknown, {name, age, isMarried}: CreateUserInput): User => {
            const newUser: User = {
                id: (users.length + 1).toString(),
                name,
                age,
                isMarried
            };
            users.push(newUser);
            return newUser;
        },
        deleteUserById: (_: unknown, {id}: { id: string }): User[] => {
            const userIndex = users.findIndex(user => user.id === id);
            if (userIndex !== -1) {
                users.splice(userIndex, 1);
            }
            return users;
        },
        editUserById: (_: unknown, { input}: {input:UpdateUserInput}): User[] => {
            const { id, newName, newAge, isMarriedStatusChanged } = input;
            const userIndex = users.findIndex((user) => user.id === id);

            if (userIndex === -1) {
                throw new Error(`Пользователь с ID ${id} не найден`);
            }

            // Обновляем пользователя
            users[userIndex] = {
                ...users[userIndex],
                name: newName !== undefined ? newName : users[userIndex].name,
                age: newAge !== undefined ? newAge : users[userIndex].age,
                isMarried: isMarriedStatusChanged !== undefined ? isMarriedStatusChanged : users[userIndex].isMarried,
            };

            return users;
        },
    }
};
