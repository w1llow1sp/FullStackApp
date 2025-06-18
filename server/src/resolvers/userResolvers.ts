import {User, CreateUserInput, UpdateUserInput, FilterUsersInput} from '../types/user.js';

// In-memory database
export const users: User[] = [
    {id: "1", name: "Александр Петров", age: 32, isMarried: true},
    {id: "2", name: "Елена Смирнова", age: 28, isMarried: false},
    {id: "3", name: "Дмитрий Иванов", age: 35, isMarried: true},
    {id: "4", name: "Мария Козлова", age: 24, isMarried: false},
    {id: "5", name: "Сергей Волков", age: 29, isMarried: true},
    {id: "6", name: "Анна Морозова", age: 31, isMarried: false},
    {id: "7", name: "Андрей Соколов", age: 27, isMarried: true},
    {id: "8", name: "Ольга Лебедева", age: 33, isMarried: true},
    {id: "9", name: "Михаил Новиков", age: 26, isMarried: false},
    {id: "10", name: "Татьяна Егорова", age: 30, isMarried: true},
    {id: "11", name: "Владимир Козлов", age: 38, isMarried: true},
    {id: "12", name: "Наталья Степанова", age: 25, isMarried: false},
    {id: "13", name: "Игорь Николаев", age: 34, isMarried: false},
    {id: "14", name: "Юлия Орлова", age: 29, isMarried: true},
    {id: "15", name: "Павел Андреев", age: 31, isMarried: true},
    {id: "16", name: "Екатерина Макарова", age: 27, isMarried: false},
    {id: "17", name: "Алексей Зайцев", age: 36, isMarried: true},
    {id: "18", name: "Ирина Соловьева", age: 28, isMarried: false},
    {id: "19", name: "Роман Виноградов", age: 33, isMarried: true},
    {id: "20", name: "Светлана Романова", age: 26, isMarried: false},
];

export const userResolvers = {
    Query: {
        getUsers: (): User[] => {
            return users;
        },
        getUserById: (_: unknown, {id}: { id: string }): User | undefined => {
            return users.find(user => user.id === id);
        },
        searchUsers: (_: unknown, {searchTerm}: { searchTerm: string }): User[] => {
            const term = searchTerm.toLowerCase().trim();
            if (!term) return users;
            
            return users.filter(user => 
                user.name.toLowerCase().includes(term)
            );
        },
        filterUsers: (_: unknown, {input}: { input: FilterUsersInput }): User[] => {
            const { nameSearch, ageFrom, ageTo, isMarried } = input;
            
            return users.filter(user => {
                // Фильтр по имени (не строгое совпадение)
                if (nameSearch && !user.name.toLowerCase().includes(nameSearch.toLowerCase())) {
                    return false;
                }
                
                // Фильтр по возрасту (от и до)
                if (ageFrom !== undefined && user.age < ageFrom) {
                    return false;
                }
                if (ageTo !== undefined && user.age > ageTo) {
                    return false;
                }
                
                // Фильтр по семейному положению
                if (isMarried !== undefined && user.isMarried !== isMarried) {
                    return false;
                }
                
                return true;
            });
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
