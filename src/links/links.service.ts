import { Injectable, Logger } from '@nestjs/common';
import { Link } from '../entities/link.entity';
import { CreateLinkDto } from './dtos/create-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class LinksService {
  private readonly logger = new Logger(LinksService.name);
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Link) private readonly repository: Repository<Link>,
  ) {}

  async findAll(): Promise<Link[]> {
    this.logger.log('Fetch all links');
    return this.repository.find();
  }

  async search(query: string): Promise<Link[]> {
    return this.repository.find({
      title: ILike(`%${query}%`),
    });

    /*return this.repository.createQueryBuilder()
            .where("LOWER(title) = LOWER(:query)", { query })
            .getMany();*/
  }

  async create(userId: number, createLinkDto: CreateLinkDto): Promise<Link> {
    const link = new Link();
    link.title = createLinkDto.title;
    link.url = createLinkDto.url;
    link.created_date = new Date();
    link.created_by = await this.userService.findById(userId);

    return this.repository.save(link);
  }

  async removeById(id: number) {
    await this.repository.delete(id);
  }
}
