import { Injectable, Logger } from '@nestjs/common';
import { CreatePostDto, PostsPageDto } from './posts.dtos';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { mapToPostDto } from './post.mapper';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    private usersService: UsersService,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(
    userId: number,
    createPostDto: CreatePostDto,
  ): Promise<Post> {
    const user = await this.usersService.getUserById(userId);
    const post = new Post();
    post.title = createPostDto.title;
    post.url = createPostDto.url;
    post.content = createPostDto.content;
    post.created_date = new Date();
    post.created_by = user;

    return this.postRepository.save(post);
  }

  async getPosts(query: string, page: number): Promise<PostsPageDto> {
    this.logger.log(`Find post for query: ${query} and page: ${page}`);
    const pageSize = 5;
    const totalElements = await this.postRepository
      .createQueryBuilder()
      .where('LOWER(title) like LOWER(:query)', { query: '%' + query + '%' })
      .getCount();

    const data = await this.postRepository
      .createQueryBuilder('posts')
      .where('LOWER(title) like LOWER(:query)', { query: '%' + query + '%' })
      .leftJoinAndSelect('posts.created_by', 'users')
      .addOrderBy('posts.id', 'DESC')
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .getMany()
      .then((posts) => posts.map((post) => mapToPostDto(post)));
    const totalPages = Math.ceil(totalElements / pageSize);

    return {
      data: data,
      totalElements: totalElements,
      totalPages: totalPages,
      pageNumber: page,
      isFirst: page === 1,
      isLast: page === totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    };
  }

  async getPostById(postId: number): Promise<Post | null> {
    this.logger.log(`Find post by id: ${postId}`);
    return this.postRepository
      .createQueryBuilder('posts')
      .where({ id: postId })
      .leftJoinAndSelect('posts.created_by', 'users')
      .getOne();
  }

  async deletePostById(postId: number) {
    this.logger.log(`Delete post by id: ${postId}`);
    await this.postRepository.delete(postId);
  }
}
