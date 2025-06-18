import {userResolvers, users} from '../resolvers/userResolvers.js';
import {User} from "../types/user";

beforeEach(() => {
    users.length = 0;
    users.push(
        {id: "1", name: "John Doe", age: 30, isMarried: true},
        {id: "2", name: "Jane Smith", age: 25, isMarried: false},
        {id: "3", name: "Alice Johnson", age: 28, isMarried: false}
    );
});

describe('User Resolvers', () => {
    describe('Query', () => {
        describe('getUsers', () => {
            it('Должен вернуть всех пользователей', () => {
                const result = userResolvers.Query.getUsers();
                expect(result).toHaveLength(3);
                expect(result[0]).toHaveProperty('id');
                expect(result[0]).toHaveProperty('name');
                expect(result[0]).toHaveProperty('age');
                expect(result[0]).toHaveProperty('isMarried');
            });
        });

        describe('getUserById', () => {
            it('Должен вернуть пользователя по id', () => {
                const result = userResolvers.Query.getUserById({}, {id: '1'});
                expect(result).toBeDefined();
                expect(result?.id).toBe('1');
            });

            it('Должен вернуть undefined для несуществующего id', () => {
                const result = userResolvers.Query.getUserById({}, {id: '999'});
                expect(result).toBeUndefined();
            });
        });
    });

    describe('Mutation', () => {
        describe('createUser', () => {
            it('Должен создать нового пользователя', () => {
                const newUser = {
                    name: 'Test User',
                    age: 25,
                    isMarried: false
                };

                const result = userResolvers.Mutation.createUser({}, newUser);
                expect(result).toMatchObject({
                    name: newUser.name,
                    age: newUser.age,
                    isMarried: newUser.isMarried
                });
                expect(result.id).toBeDefined();

                const usersList = userResolvers.Query.getUsers();
                expect(usersList).toContainEqual(result);
            });
        });

        describe('deleteUserById', () => {
            it('Должен удалить пользователя по ID и вернуть обновленный массив', () => {
                // Проверяем начальное состояние
                const initialUsers = userResolvers.Query.getUsers();
                expect(initialUsers).toHaveLength(3);
                expect(initialUsers).toContainEqual(
                    expect.objectContaining({id: "1", name: "John Doe"})
                );

                // Удаляем пользователя
                const result = userResolvers.Mutation.deleteUserById({}, {id: '1'});

                // Проверяем результат
                expect(result).toBeDefined();
                expect(result).toHaveLength(2);

                // Проверяем, что удаленный пользователь отсутствует в результате
                expect(result).not.toContainEqual(
                    expect.objectContaining({id: "1"})
                );

                // Проверяем, что остальные пользователи остались
                expect(result).toContainEqual(
                    expect.objectContaining({id: "2", name: "Jane Smith"})
                );
                expect(result).toContainEqual(
                    expect.objectContaining({id: "3", name: "Alice Johnson"})
                );
            });

            it('Должен корректно обработать удаление несуществующего пользователя', () => {
                // Проверяем начальное состояние
                const initialUsers = userResolvers.Query.getUsers();
                expect(initialUsers).toHaveLength(3);

                // Пытаемся удалить несуществующего пользователя
                const result = userResolvers.Mutation.deleteUserById({}, {id: "999"});

                // Проверяем, что результат определен и массив не изменился
                expect(result).toBeDefined();
                expect(result).toHaveLength(3);

                // Проверяем, что все пользователи остались на месте
                expect(result).toContainEqual(
                    expect.objectContaining({id: "1", name: "John Doe"})
                );
                expect(result).toContainEqual(
                    expect.objectContaining({id: "2", name: "Jane Smith"})
                );
                expect(result).toContainEqual(
                    expect.objectContaining({id: "3", name: "Alice Johnson"})
                );
            });

            it('Должен удалить последнего пользователя из списка', () => {
                // Удаляем пользователя с id "3"
                const result = userResolvers.Mutation.deleteUserById({}, {id: '3'});

                expect(result).toBeDefined();
                expect(result).toHaveLength(2);

                // Проверяем, что пользователь с id "3" удален
                expect(result).not.toContainEqual(
                    expect.objectContaining({id: "3"})
                );

                // Проверяем, что остальные пользователи остались
                expect(result).toContainEqual(
                    expect.objectContaining({id: "1", name: "John Doe"})
                );
                expect(result).toContainEqual(
                    expect.objectContaining({id: "2", name: "Jane Smith"})
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
                        age:25,
                        isMarried: false
                    })
                )
                // Данные те же по длине
                expect(result).toHaveLength(3)

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
                        name: "Jane Smith",
                        age:35,
                        isMarried: false
                    })
                )
                // Данные те же по длине
                expect(result).toHaveLength(3)

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
                        name: "Jane Smith",
                        age:25,
                        isMarried: true
                    })
                )
                // Данные те же по длине
                expect(result).toHaveLength(3)

            })
            // Смотрим обработку при не существующем ID
            it('Резолвер при не существующем ID выдаст ошибку', () => {
                const input = { id: '999', isMarriedStatusChanged: true };

                // Проверяем, что вызов резолвера выбрасывает ошибку
                expect(() =>
                    userResolvers.Mutation.editUserById({}, { input })
                ).toThrow(`Пользователь с ID 999 не найден`);


                // Проверяем, что массив users не изменился
                expect(users).toHaveLength(3);
                expect(users).toContainEqual(
                    expect.objectContaining({ id: '1', name: 'John Doe' })
                );
                expect(users).toContainEqual(
                    expect.objectContaining({ id: '2', name: 'Jane Smith' })
                );

            })
        });
    });
});
