import { userResolvers } from '../resolvers/userResolvers.js';

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
        const result = userResolvers.Query.getUserById({}, { id: '1' });
        expect(result).toBeDefined();
        expect(result?.id).toBe('1');
      });

      it('Должен вернуть undefined для несуществующего id', () => {
        const result = userResolvers.Query.getUserById({}, { id: '999' });
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

        const users = userResolvers.Query.getUsers();
        expect(users).toContainEqual(result);
      });
    });
  });
});
