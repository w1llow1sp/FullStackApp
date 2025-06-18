export interface User {
  id: string;
  name: string;
  age: number;
  isMarried: boolean;
}

export interface CreateUserInput {
  name: string;
  age: number;
  isMarried: boolean;
}

export interface UpdateUserInput {
  id: string;
  newName?: string; // Опционально, так как пользователь может не менять имя
  newAge?: number;  // Опционально, так как возраст может не меняться
  isMarriedStatusChanged?: boolean; // Опционально, новое значение для isMarried
}

export interface FilterUsersInput {
  nameSearch?: string;
  ageFrom?: number;
  ageTo?: number;
  isMarried?: boolean;
}
