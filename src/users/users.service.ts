import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { Role } from '../entities/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async findById(userId: number): Promise<User | undefined> {
    this.logger.log('Finding user with id: ', userId);
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .leftJoinAndSelect('user.roles', 'roles')
      .getOne();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    this.logger.log('Finding user with email: ', email);
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .leftJoinAndSelect('user.roles', 'roles')
      .getOne();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    user.created_date = new Date();

    const userRole = await this.roleRepository
      .createQueryBuilder('role')
      .where('role.name = :name', { name: 'ROLE_USER' })
      .getOne();
    user.roles = [userRole];
    return this.userRepository.save(user);
  }
}
