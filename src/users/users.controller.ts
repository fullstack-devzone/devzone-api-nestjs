import {Body, Controller, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {User} from "../entities/user.entity";
import {CreateUserDto} from "./dtos/create-user.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

}
