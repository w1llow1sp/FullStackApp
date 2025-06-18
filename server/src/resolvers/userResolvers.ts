import {User, CreateUserInput} from '../types/user.js';

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
        }
    }
};
