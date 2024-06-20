import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './users.dtos';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const count = await this.userRepository.countBy({
      email: createUserDto.email,
    });
    if (count !== 0) {
      throw new BadRequestException('Email already exists');
    }
    const password = await bcrypt.hash(createUserDto.password, 10);
    const user = new User(
      createUserDto.name,
      createUserDto.email,
      password,
      'ROLE_USER',
    );
    const savedUser = await this.userRepository.save(user);
    return Promise.resolve(savedUser);
  }

  async getUserById(userId: number): Promise<User | undefined> {
    this.logger.log(`Finding user with id: ${userId}`);
    const user = await this.userRepository.findOneBy({ id: userId });
    return Promise.resolve(user);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    this.logger.log(`Finding user with email: ${email}`);
    const user = await this.userRepository.findOneBy({ email: email });
    return Promise.resolve(user);
  }
}
