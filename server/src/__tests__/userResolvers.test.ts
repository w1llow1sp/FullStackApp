import {userResolvers, users} from '../resolvers/userResolvers.js';
import {User} from "../types/user";

beforeEach(() => {
    users.length = 0;
    users.push(
        {id: "1", name: "Александр Петров", age: 32, isMarried: true},
        {id: "2", name: "Елена Смирнова", age: 28, isMarried: false},
        {id: "3", name: "Дмитрий Иванов", age: 35, isMarried: true},
        {id: "4", name: "Мария Козлова", age: 24, isMarried: false},
        {id: "5", name: "Сергей Волков", age: 29, isMarried: true}
    );
});

describe('User Resolvers', () => {
    describe('Query', () => {
        describe('getUsers', () => {
            it('Должен вернуть всех пользователей', () => {
                const result = userResolvers.Query.getUsers();
                expect(result).toHaveLength(5);
                expect(result[0].name).toBe('Александр Петров');
            });
        });

        describe('getUserById', () => {
            it('Должен вернуть пользователя по id', () => {
                const result = userResolvers.Query.getUserById({}, {id: '1'});
                expect(result).toEqual({id: "1", name: "Александр Петров", age: 32, isMarried: true});
            });

            it('Должен вернуть undefined для несуществующего id', () => {
                const result = userResolvers.Query.getUserById({}, {id: '999'});
                expect(result).toBeUndefined();
            });
        });

        describe('searchUsers', () => {
            it('Должен вернуть пользователей, соответствующих поисковому запросу (без учета регистра)', () => {
                const result = userResolvers.Query.searchUsers({}, {searchTerm: 'петров'});
                expect(result).toHaveLength(1);
                expect(result[0].name).toBe('Александр Петров');
            });

            it('Должен вернуть пользователей с частичным совпадением имени', () => {
                const result = userResolvers.Query.searchUsers({}, {searchTerm: 'александр'});
                expect(result).toHaveLength(1);
                expect(result[0].name).toBe('Александр Петров');
            });

            it('Должен вернуть всех пользователей, если поисковый запрос пуст', () => {
                const result = userResolvers.Query.searchUsers({}, {searchTerm: ''});
                expect(result).toHaveLength(5);
            });

            it('Должен вернуть всех пользователей, если поисковый запрос состоит только из пробелов', () => {
                const result = userResolvers.Query.searchUsers({}, {searchTerm: '   '});
                expect(result).toHaveLength(5);
            });

            it('Должен вернуть несколько пользователей, если поисковый запрос соответствует нескольким именам', () => {
                const result = userResolvers.Query.searchUsers({}, {searchTerm: 'а'});
                expect(result).toHaveLength(4);
                expect(result.some(user => user.name === 'Александр Петров')).toBe(true);
                expect(result.some(user => user.name === 'Елена Смирнова')).toBe(true);
                expect(result.some(user => user.name === 'Дмитрий Иванов')).toBe(true);
                expect(result.some(user => user.name === 'Мария Козлова')).toBe(true);
            });
        });

        describe('filterUsers', () => {
            it('Должен отфильтровать пользователей по поисковому запросу', () => {
                const result = userResolvers.Query.filterUsers({}, {input: {nameSearch: 'петров'}});
                expect(result).toHaveLength(1);
                expect(result[0].name).toBe('Александр Петров');
            });

            it('Должен отфильтровать пользователей по диапазону возраста', () => {
                const result = userResolvers.Query.filterUsers({}, {input: {ageFrom: 30}});
                expect(result).toHaveLength(2);
                expect(result.every(user => user.age >= 30)).toBe(true);
            });

            it('Должен отфильтровать пользователей по диапазону возраста', () => {
                const result = userResolvers.Query.filterUsers({}, {input: {ageTo: 25}});
                expect(result).toHaveLength(1);
                expect(result.every(user => user.age <= 25)).toBe(true);
            });

            it('Должен отфильтровать пользователей по диапазону возраста', () => {
                const result = userResolvers.Query.filterUsers({}, {input: {ageFrom: 25, ageTo: 30}});
                expect(result).toHaveLength(2);
                expect(result.every(user => user.age >= 25 && user.age <= 30)).toBe(true);
            });

            it('Должен отфильтровать пользователей по семейному положению', () => {
                const result = userResolvers.Query.filterUsers({}, {input: {isMarried: true}});
                expect(result).toHaveLength(3);
                expect(result.every(user => user.isMarried)).toBe(true);
            });

            it('Должен отфильтровать пользователей по семейному положению', () => {
                const result = userResolvers.Query.filterUsers({}, {input: {isMarried: false}});
                expect(result).toHaveLength(2);
                expect(result.every(user => !user.isMarried)).toBe(true);
            });

            it('Должен отфильтровать пользователей по нескольким фильтрам', () => {
                const result = userResolvers.Query.filterUsers({}, {input: {nameSearch: 'александр', ageFrom: 30, isMarried: true}});
                expect(result).toHaveLength(1);
                expect(result[0].name).toBe('Александр Петров');
                expect(result[0].age).toBe(32);
                expect(result[0].isMarried).toBe(true);
            });

            it('Должен вернуть всех пользователей, если не применяются фильтры', () => {
                const result = userResolvers.Query.filterUsers({}, {input: {}});
                expect(result).toHaveLength(5);
            });
        });
    });

    describe('Mutation', () => {
        describe('createUser', () => {
            it('Должен создать нового пользователя', () => {
                const newUser = userResolvers.Mutation.createUser({}, {
                    name: 'Тестовый Пользователь',
                    age: 40,
                    isMarried: false
                });

                expect(newUser).toEqual({
                    id: '6',
                    name: 'Тестовый Пользователь',
                    age: 40,
                    isMarried: false
                });

                expect(users).toHaveLength(6);
                expect(users[5]).toEqual(newUser);
            });
        });

        describe('deleteUserById', () => {
            it('Должен удалить пользователя по ID и вернуть обновленный массив', () => {
                // Проверяем начальное состояние
                const initialUsers = userResolvers.Query.getUsers();
                expect(initialUsers).toHaveLength(5);
                expect(initialUsers.find(user => user.id === '1')).toEqual(
                    expect.objectContaining({id: "1", name: "Александр Петров"})
                );

                // Удаляем пользователя
                const result = userResolvers.Mutation.deleteUserById({}, {id: '1'});

                // Проверяем результат
                expect(result).toBeDefined();
                expect(result).toHaveLength(4);

                // Проверяем, что удаленный пользователь отсутствует в результате
                expect(result.find(user => user.id === '1')).toBeUndefined();

                // Проверяем, что остальные пользователи остались
                expect(result).toContainEqual(
                    expect.objectContaining({id: "2", name: "Елена Смирнова"})
                );
                expect(result).toContainEqual(
                    expect.objectContaining({id: "3", name: "Дмитрий Иванов"})
                );
                expect(result).toContainEqual(
                    expect.objectContaining({id: "4", name: "Мария Козлова"})
                );
                expect(result).toContainEqual(
                    expect.objectContaining({id: "5", name: "Сергей Волков"})
                );
            });

            it('Должен корректно обработать удаление несуществующего пользователя', () => {
                // Проверяем начальное состояние
                const initialUsers = userResolvers.Query.getUsers();
                expect(initialUsers).toHaveLength(5);

                // Пытаемся удалить несуществующего пользователя
                const result = userResolvers.Mutation.deleteUserById({}, {id: "999"});

                // Проверяем, что результат определен и массив не изменился
                expect(result).toBeDefined();
                expect(result).toHaveLength(5);

                // Проверяем, что все пользователи остались на месте
                expect(result).toContainEqual(
                    expect.objectContaining({id: "1", name: "Александр Петров"})
                );
                expect(result).toContainEqual(
                    expect.objectContaining({id: "2", name: "Елена Смирнова"})
                );
                expect(result).toContainEqual(
                    expect.objectContaining({id: "3", name: "Дмитрий Иванов"})
                );
                expect(result).toContainEqual(
                    expect.objectContaining({id: "4", name: "Мария Козлова"})
                );
                expect(result).toContainEqual(
                    expect.objectContaining({id: "5", name: "Сергей Волков"})
                );
            });

            it('Должен удалить последнего пользователя из списка', () => {
                // Удаляем пользователя с id "5"
                const result = userResolvers.Mutation.deleteUserById({}, {id: '5'});

                expect(result).toBeDefined();
                expect(result).toHaveLength(4);

                // Проверяем, что пользователь с id "5" удален
                expect(result.find(user => user.id === '5')).toBeUndefined();

                // Проверяем, что остальные пользователи остались
                expect(result).toContainEqual(
                    expect.objectContaining({id: "1", name: "Александр Петров"})
                );
                expect(result).toContainEqual(
                    expect.objectContaining({id: "2", name: "Елена Смирнова"})
                );
                expect(result).toContainEqual(
                    expect.objectContaining({id: "3", name: "Дмитрий Иванов"})
                );
                expect(result).toContainEqual(
                    expect.objectContaining({id: "4", name: "Мария Козлова"})
                );
            });
        });

        describe('editUserById', () => {
            // Смотрим, что при измении имени меняет только имя
            it('Резолвер при изменении имении меняет только имя и ничего более', () => {
                const result = userResolvers.Mutation.editUserById({},{input:{id:'2', newName:"Sunny Doewn"}});
                // Результат определен
                expect(result).toBeDefined();
                // Поменяли только имя
                expect(result).toContainEqual(
                    expect.objectContaining({
                        id:"2",
                        name: "Sunny Doewn",
                        age:28,
                        isMarried: false
                    })
                )
                // Данные те же по длине
                expect(result).toHaveLength(5)

            })
            // Смотрим, что при измении возраста меняет только возраст
            it('Резолвер при изменении имении меняет только возраст и ничего более', () => {
                const result = userResolvers.Mutation.editUserById({},{input:{id:'2', newAge:35}});
                // Результат определен
                expect(result).toBeDefined();
                // Поменяли только имя
                expect(result).toContainEqual(
                    expect.objectContaining({
                        id:"2",
                        name: "Елена Смирнова",
                        age:35,
                        isMarried: false
                    })
                )
                // Данные те же по длине
                expect(result).toHaveLength(5)

            })
            // Смотрим, что при измении семейного положения меняет только его
            it('Резолвер при изменении имении меняет только семейное положение и ничего более', () => {
                const result = userResolvers.Mutation.editUserById({},{input:{id:'2', isMarriedStatusChanged:true}});
                // Результат определен
                expect(result).toBeDefined();
                // Поменяли только имя
                expect(result).toContainEqual(
                    expect.objectContaining({
                        id:"2",
                        name: "Елена Смирнова",
                        age:28,
                        isMarried: true
                    })
                )
                // Данные те же по длине
                expect(result).toHaveLength(5)

            })
            // Смотрим обработку при не существующем ID
            it('Резолвер при не существующем ID выдаст ошибку', () => {
                const input = { id: '999', isMarriedStatusChanged: true };

                // Проверяем, что вызов резолвера выбрасывает ошибку
                expect(() =>
                    userResolvers.Mutation.editUserById({}, { input })
                ).toThrow(`Пользователь с ID 999 не найден`);


                // Проверяем, что массив users не изменился
                expect(users).toHaveLength(5);
                expect(users).toContainEqual(
                    expect.objectContaining({ id: '1', name: 'Александр Петров' })
                );
                expect(users).toContainEqual(
                    expect.objectContaining({ id: '2', name: 'Елена Смирнова' })
                );
                expect(users).toContainEqual(
                    expect.objectContaining({ id: '3', name: 'Дмитрий Иванов' })
                );
                expect(users).toContainEqual(
                    expect.objectContaining({ id: '4', name: 'Мария Козлова' })
                );
                expect(users).toContainEqual(
                    expect.objectContaining({ id: '5', name: 'Сергей Волков' })
                );

            })
        });
    });
});
