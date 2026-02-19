import { Injectable } from '@nestjs/common';

export class User {
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  // CREATE
  createUser(user: User) {
    this.users.push(user);
    return { message: 'User added successfully' };
  }

  // READ
  getUsers(): User[] {
    return this.users;
  }

  // UPDATE
  updateUser(index: number, updatedUser: User) {
    this.users[index] = updatedUser;
    return { message: 'User updated successfully' };
  }

  // DELETE
  deleteUser(index: number) {
    this.users.splice(index, 1);
    return { message: 'User deleted successfully' };
  }
}
