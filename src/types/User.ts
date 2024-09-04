export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface FilterState {
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface UserState {
  users: User[];
  filters: FilterState;
}
