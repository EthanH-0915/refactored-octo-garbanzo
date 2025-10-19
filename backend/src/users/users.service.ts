import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  //In-memory "database" for now (replace later with real DB)
  private users: User[] = [
    { id: 1, email: 'test@example.com', password: '1234' },
    { id: 2, email: 'user2@example.com', password: 'password' },
  ];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }

  async createUser(email: string, password: string): Promise<User> {
    const id = this.users.length + 1;
    const newUser = { id, email, password };
    this.users.push(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}