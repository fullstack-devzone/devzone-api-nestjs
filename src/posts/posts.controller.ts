import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, PostDto, PostsPageDto } from './posts.dtos';
import { ApiQuery } from '@nestjs/swagger';
import { CurrentUser } from '../auth/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from '../users/users.dtos';
import { mapToPostDto } from './post.mapper';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: UserDto,
  ): Promise<PostDto> {
    return this.postsService
      .createPost(user.id, createPostDto)
      .then((post) => mapToPostDto(post));
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'query', required: false, type: String })
  async getPosts(
    @Query('page') page: number = 1,
    @Query('query') query: string = '',
  ): Promise<PostsPageDto> {
    return this.postsService.getPosts(query, page);
  }

  @Get(':postId')
  async getPostById(@Param('postId') postId: number): Promise<PostDto> {
    return this.postsService.getPostById(postId).then((post) => {
      if (post != null) {
        return mapToPostDto(post);
      }
      throw new NotFoundException();
    });
  }

  @Delete(':postId')
  @UseGuards(JwtAuthGuard)
  async deletePostById(
    @Param('postId') postId: number,
    @CurrentUser() user: UserDto,
  ) {
    const post = await this.postsService.getPostById(postId);
    if (post.created_by.id == user.id) {
      return this.postsService.deletePostById(postId);
    } else {
      throw new UnauthorizedException();
    }
  }
}
