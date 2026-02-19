import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: any[] = [];

  // CREATE
  createUser(user: any) {
    this.users.push(user);
    return { message: 'User added successfully' };
  }

  // READ
  getUsers() {
    return this.users;
  }

  // UPDATE
  updateUser(index: number, updatedUser: any) {
    this.users[index] = updatedUser;
    return { message: 'User updated successfully' };
  }

  // DELETE
  deleteUser(index: number) {
    this.users.splice(index, 1);
    return { message: 'User deleted successfully' };
  }
}
