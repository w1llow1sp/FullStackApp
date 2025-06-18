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

export interface UsersState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
} 