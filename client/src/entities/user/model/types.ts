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

export interface FilterOptions {
  search: string;
  ageFilter: 'all' | 'young' | 'adult' | 'senior';
  marriageFilter: 'all' | 'married' | 'single';
} 