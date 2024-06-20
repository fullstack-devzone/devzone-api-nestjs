import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserDto } from './users.dtos';
import { mapToUserDto } from './user.mapper';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService
      .createUser(createUserDto)
      .then((user) => mapToUserDto(user));
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: number): Promise<UserDto> {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return mapToUserDto(user);
  }
}
