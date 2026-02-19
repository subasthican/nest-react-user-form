import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService, User } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // CREATE
  @Post()
  create(@Body() body: User) {
    return this.usersService.createUser(body);
  }

  // READ
  @Get()
  getAll() {
    return this.usersService.getUsers();
  }

  // UPDATE
  @Put(':index')
  update(@Param('index') index: string, @Body() body: User) {
    return this.usersService.updateUser(Number(index), body);
  }

  // DELETE
  @Delete(':index')
  delete(@Param('index') index: string) {
    return this.usersService.deleteUser(Number(index));
  }
}
